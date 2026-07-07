import { useEffect, useState } from 'react'

/** Fixed HUD side-rail: brand tag + live scroll percentage readout. Desktop only. */
export default function SideRail() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="pointer-events-none fixed left-5 top-0 z-40 hidden h-full flex-col items-center justify-between py-24 xl:flex"
      aria-hidden="true"
    >
      <p className="font-mono text-[0.55rem] uppercase tracking-[0.32em] text-ink-soft/50 [writing-mode:vertical-rl]">
        Paarth® — Modern Business Capability
      </p>
      <div className="flex flex-col items-center gap-3">
        <span className="relative h-16 w-px bg-line">
          <span className="absolute inset-x-0 top-0 bg-brass" style={{ height: `${pct}%` }} />
        </span>
        <p className="font-mono text-[0.55rem] font-bold tracking-[0.2em] text-brass">
          {String(pct).padStart(3, '0')}%
        </p>
      </div>
    </div>
  )
}
