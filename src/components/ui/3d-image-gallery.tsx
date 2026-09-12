import { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext, Component } from 'react'
import type { ReactNode } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Sphere } from '@react-three/drei'
import { ImageOff, X } from 'lucide-react'

export interface GalaxyPhoto {
  id: string
  src: string | null
  caption: string
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
  const isPlaceholder = !photo.src

  useFrame(({ camera }) => {
    if (groupRef.current) groupRef.current.lookAt(camera.position)
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* pointerEvents="auto" makes the card itself the click/hover target --
          no separate invisible mesh to keep in sync, so the hit area always
          matches exactly what's visible. */}
      <Html transform distanceFactor={10} position={[0, 0, 0.01]} pointerEvents="auto" occlude={false}>
        <div
          onClick={() => !isPlaceholder && setSelected(photo)}
          onMouseEnter={() => !isPlaceholder && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="flex h-52 w-40 select-none flex-col overflow-hidden rounded-2xl border p-2"
          style={{
            cursor: isPlaceholder ? 'default' : 'pointer',
            backgroundColor: '#141414',
            borderColor: hovered ? 'rgba(215,226,234,0.6)' : 'rgba(215,226,234,0.15)',
            boxShadow: hovered ? '0 20px 40px rgba(215,226,234,0.15)' : '0 10px 24px rgba(0,0,0,0.6)',
            transition: 'box-shadow 0.15s ease, border-color 0.15s ease',
          }}
        >
          {isPlaceholder ? (
            <div className="flex h-40 w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[#D7E2EA]/30 text-[#D7E2EA]/40">
              <ImageOff className="h-6 w-6" strokeWidth={1.5} />
            </div>
          ) : (
            <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-black">
              <img src={photo.src ?? undefined} alt={photo.caption} className="h-full w-full object-contain" loading="lazy" draggable={false} />
            </div>
          )}
          <div className="mt-1 text-center">
            <p className="truncate text-xs font-medium text-[#D7E2EA]">{photo.caption}</p>
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

  if (!selected || !selected.src) return null

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
      <div className="relative mx-4 w-full max-w-md">
        <button onClick={handleClose} className="absolute -top-12 right-0 z-10 text-[#D7E2EA] transition-colors hover:text-white" aria-label="Close">
          <X className="h-8 w-8" />
        </button>

        <div style={{ perspective: '1000px' }} className="w-full">
          <div
            ref={cardRef}
            className="relative w-full rounded-3xl border border-[#D7E2EA]/15 p-4 transition-transform duration-500 ease-out"
            style={{ backgroundColor: '#141414', transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative mb-4 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-black" style={{ aspectRatio: '3 / 4' }}>
              <img src={selected.src} alt={selected.caption} className="h-full w-full object-contain" loading="lazy" />
            </div>
            <h3 className="text-center text-lg font-semibold text-[#D7E2EA]">{selected.caption}</h3>
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
          camera={{ position: [0, 0, 14], fov: 60 }}
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
                maxDistance={30}
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
