import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// A soft "not public yet" gate -- keeps the site from being stumbled on or
// shared before it's ready, but this is NOT real security: the code lives in
// the browser's JS bundle, so anyone who inspects it can find it. That's
// fine for this purpose (a casual gate before an intentional public launch),
// just don't rely on it to hide anything actually sensitive.
//
// TO CHANGE THE CODE: edit ACCESS_CODE below.
// TO REMOVE THIS GATE LATER: in src/main.tsx, delete the <AccessGate> and
// </AccessGate> wrapper tags (leave <App /> in place) and remove the import.
// That's it -- nothing else in the app needs to change.
const ACCESS_CODE = 'pomar.blendz'
const STORAGE_KEY = 'site-access-granted'

export default function AccessGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [showCode, setShowCode] = useState(false)

  if (unlocked) return <>{children}</>

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (code.trim().toLowerCase() === ACCESS_CODE.toLowerCase()) {
      try {
        localStorage.setItem(STORAGE_KEY, 'true')
      } catch {
        // Storage blocked (private browsing, etc.) -- they'll just need to
        // re-enter the code next visit, which is a fine fallback.
      }
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0C0C0C] px-6 text-center">
      <h1
        className="hero-heading font-black uppercase tracking-tight"
        style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
      >
        Private Preview
      </h1>
      <p className="mt-3 max-w-sm text-base text-[#D7E2EA]/70">
        Aarush Pomar's personal website
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xs flex-col items-center gap-3">
        <div className="relative w-full">
          <input
            type={showCode ? 'text' : 'password'}
            value={code}
            onChange={(e) => {
              setCode(e.target.value)
              setError(false)
            }}
            placeholder="Access code"
            autoFocus
            className="w-full rounded-full border-2 border-[#D7E2EA]/30 bg-transparent py-3 pl-6 pr-12 text-center text-sm tracking-widest text-[#D7E2EA] outline-none placeholder:text-[#D7E2EA]/30 placeholder:normal-case focus:border-[#D7E2EA]"
          />
          <button
            type="button"
            onClick={() => setShowCode((prev) => !prev)}
            aria-label={showCode ? 'Hide access code' : 'Show access code'}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#D7E2EA]/50 transition-colors hover:text-[#D7E2EA]"
          >
            {showCode ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full rounded-full border-2 border-[#D7E2EA] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
        >
          Enter
        </button>
        {error && <p className="text-xs text-red-400">That code isn't right -- try again.</p>}
      </form>
    </div>
  )
}
