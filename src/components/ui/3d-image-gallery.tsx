import { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext, Component } from 'react'
import type { ReactNode } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Sphere } from '@react-three/drei'
import { X } from 'lucide-react'

export interface GalaxyPhoto {
  id: string
  src: string
  caption: string
  /** CSS object-position for the cropped floating card (default keeps heads, which sit high in most shots). */
  focus?: string
}

/* =========================
   Photo context
   ========================= */

interface PhotoContextType {
  selected: GalaxyPhoto | null
  setSelected: (photo: GalaxyPhoto | null) => void
  photos: GalaxyPhoto[]
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined)

function usePhotos() {
  const ctx = useContext(PhotoContext)
  if (!ctx) throw new Error('usePhotos must be used within PhotoProvider')
  return ctx
}

function PhotoProvider({ photos, children }: { photos: GalaxyPhoto[]; children: ReactNode }) {
  const [selected, setSelected] = useState<GalaxyPhoto | null>(null)
  return <PhotoContext.Provider value={{ selected, setSelected, photos }}>{children}</PhotoContext.Provider>
}

/* =========================
   Starfield background -- scoped to its own container, not the viewport
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 1)
    container.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 2500
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xd7e2ea, size: 0.7, sizeAttenuation: true })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const resizeObserver = new ResizeObserver(() => {
      if (!container.clientWidth || !container.clientHeight) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    })
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationId)
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-[#0C0C0C]" />
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null }
  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? `${error.message}\n${error.stack}` : String(error) }
  }
  render() {
    if (this.state.error) {
      return (
        <Html center style={{ color: 'red', whiteSpace: 'pre-wrap', width: '400px', fontSize: '10px' }}>
          {this.state.error}
        </Html>
      )
    }
    return this.props.children
  }
}

/* =========================
   Floating photo card
   ========================= */

function FloatingCard({
  photo,
  position,
}: {
  photo: GalaxyPhoto
  position: { x: number; y: number; z: number }
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelected } = usePhotos()

  useFrame(({ camera }) => {
    if (groupRef.current) groupRef.current.lookAt(camera.position)
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* pointerEvents="auto" makes the card itself the click/hover target --
          no separate invisible mesh to keep in sync, so the hit area always
          matches exactly what's visible. The photo fills the whole card
          (cropped with object-cover); the full uncropped photo opens in the
          modal on click. */}
      {/* The div below is rendered at 2x the size it appears on screen (and
          distanceFactor is halved to compensate) -- drei's Html "transform"
          mode rasterizes this DOM content through a CSS 3D matrix, and that
          resampling step is what was reading as blurry. Feeding it more
          source pixels than it needs makes the downscale sharper, the same
          way rendering a canvas at 2x and scaling down looks crisper. */}
      <Html transform distanceFactor={5} position={[0, 0, 0.01]} pointerEvents="auto" occlude={false}>
        <div
          onClick={() => setSelected(photo)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative h-[26rem] w-80 cursor-pointer select-none overflow-hidden rounded-[2rem]"
          style={{
            boxShadow: hovered
              ? '0 0 0 4px rgba(215,226,234,0.7), 0 40px 80px rgba(215,226,234,0.15)'
              : '0 20px 48px rgba(0,0,0,0.6)',
            transition: 'box-shadow 0.15s ease',
          }}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photo.focus ?? 'center 30%' }}
            loading="lazy"
            draggable={false}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-16">
            <p className="truncate text-center text-[1.5rem] font-medium text-[#D7E2EA]">{photo.caption}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Expanded photo modal
   ========================= */

function PhotoModal() {
  const { selected, setSelected } = usePhotos()
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selected) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rotateX = (y - rect.height / 2) / 20
    const rotateY = (rect.width / 2 - x) / 20
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transition = 'transform 0.5s ease-out'
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  const handleClose = () => setSelected(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={handleBackdropClick}>
      <div className="relative mx-4 w-fit">
        <button onClick={handleClose} className="absolute -top-12 right-0 z-10 text-[#D7E2EA] transition-colors hover:text-white" aria-label="Close">
          <X className="h-8 w-8" />
        </button>

        <div style={{ perspective: '1000px' }} className="w-full">
          <div
            ref={cardRef}
            className="relative w-fit rounded-3xl border border-[#D7E2EA]/15 p-3 transition-transform duration-500 ease-out"
            style={{ backgroundColor: '#141414', transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={selected.src}
              alt={selected.caption}
              className="block h-auto w-auto rounded-2xl"
              style={{ maxHeight: '72vh', maxWidth: 'min(86vw, 56rem)' }}
            />
            <h3 className="mt-3 text-center text-lg font-semibold text-[#D7E2EA]">{selected.caption}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Galaxy layout of cards
   ========================= */

function PhotoGalaxy() {
  const { photos } = usePhotos()

  const positions = useMemo(() => {
    const result: { x: number; y: number; z: number }[] = []
    const n = photos.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 10 + (i % 3) * 3.5

      result.push({ x: x * layerRadius, y: y * layerRadius, z: z * layerRadius })
    }
    return result
  }, [photos.length])

  return (
    <>
      <Sphere args={[10, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#D7E2EA" transparent opacity={0.04} wireframe />
      </Sphere>
      <Sphere args={[14, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#D7E2EA" transparent opacity={0.025} wireframe />
      </Sphere>

      {photos.map((photo, i) => (
        <FloatingCard key={photo.id} photo={photo} position={positions[i]} />
      ))}
    </>
  )
}

/* =========================
   Public component
   ========================= */

export default function ImageGalaxy3D({ photos }: { photos: GalaxyPhoto[] }) {
  return (
    <PhotoProvider photos={photos}>
      <div className="relative h-[80vh] w-full overflow-hidden rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#0C0C0C] sm:rounded-[40px] md:h-[85vh] md:rounded-[48px]">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 40], fov: 60 }}
          className="absolute inset-0 z-10"
          dpr={[1, 1.5]}
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = 'auto'
          }}
        >
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={0.6} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />
              <PhotoGalaxy />
              <OrbitControls
                enablePan={false}
                enableZoom
                enableRotate
                minDistance={6}
                maxDistance={40}
                rotateSpeed={0.5}
                zoomSpeed={1}
                target={[0, 0, 0]}
              />
            </Suspense>
          </SceneErrorBoundary>
        </Canvas>

        <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-center text-[#D7E2EA]/60 sm:bottom-6">
          <span className="text-xs font-medium uppercase tracking-widest sm:text-sm">Drag to orbit &middot; Scroll to zoom &middot; Click a photo</span>
        </div>

        <PhotoModal />
      </div>
    </PhotoProvider>
  )
}
