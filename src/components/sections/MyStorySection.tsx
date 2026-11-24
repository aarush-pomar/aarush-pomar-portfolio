import { useRef } from 'react'
import FadeIn from '../shared/FadeIn'

// Served straight from `public/video/my-story.mp4` -- a 40MB video belongs
// as a static file, not a bundled JS import (Vite's public dir is exactly
// for assets referenced by root-relative URL like this, same as how
// `Aarush-Pomar-Resume.pdf` is linked from ResumePage).
const MY_STORY_VIDEO_SRC = '/video/my-story.mp4'
const SKIP_SECONDS = 5

// Sits right after the dark home-page marquee and before the "Hi, I'm
// Aarush" letter in HomeIntroSection -- the video comes first so it's seen
// before a reader has to scroll past a wall of text, with the letter as the
// deeper follow-up for anyone who wants more after watching.
export default function MyStorySection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration || Infinity)
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return
    if (document.fullscreenElement) document.exitFullscreen()
    else video.requestFullscreen()
  }

  // Attached to the player wrapper (not just the video) so these shortcuts
  // fire whenever focus is anywhere in the player, not only when the
  // <video> itself is focused. Left/Right re-bind the browser's own default
  // seek (usually ~5-10s and inconsistent across browsers) to a fixed,
  // known amount; Space/Enter are left alone so the native controls' own
  // play/pause toggle still works. No visible skip buttons -- keyboard-only
  // by request.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      skip(-SKIP_SECONDS)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      skip(SKIP_SECONDS)
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault()
      toggleFullscreen()
    }
  }

  return (
    <section className="bg-[#F2F1EE] px-5 py-10 sm:px-8 sm:py-14 md:px-10">
      <FadeIn className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-[#0C0C0C]/15" />
          <h2 className="text-xl font-black uppercase tracking-tight text-[#0C0C0C] sm:text-2xl">My Story</h2>
          <div className="h-px flex-1 bg-[#0C0C0C]/15" />
        </div>

        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a
            player area needs to be focusable so its keyboard shortcuts
            (arrow-key skip, F for fullscreen) have something to attach to */}
        <div
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="w-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#230cd1]/50"
        >
          <video
            ref={videoRef}
            controls
            preload="metadata"
            playsInline
            className="w-full rounded-2xl bg-black shadow-[0_1px_3px_rgba(12,12,12,0.06),0_12px_32px_-16px_rgba(12,12,12,0.28)]"
          >
            <source src={MY_STORY_VIDEO_SRC} type="video/mp4" />
            Your browser doesn&rsquo;t support embedded video. You can{' '}
            <a href={MY_STORY_VIDEO_SRC} className="underline">
              download it here
            </a>
            .
          </video>
        </div>
      </FadeIn>
    </section>
  )
}
