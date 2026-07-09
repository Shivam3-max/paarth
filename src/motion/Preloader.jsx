import { useEffect, useRef, useState } from 'react'
import { BrandLogo } from '../components/Shared.jsx'

/** First-visit ink preloader: mono counter 0→100, wordmark, curtain lift.
 *  Driven by wall-clock timers (not rAF) so it can never stall in a background tab. */
const BOOT_LINES = [
  'INITIALIZING CAPABILITY SYSTEM …',
  'LOADING FRAMEWORKS [50+] — OK',
  'CALIBRATING PILLARS [3/3] — OK',
  'MARKETING / AI / LEADERSHIP — ONLINE',
]

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [lift, setLift] = useState(false)
  const done = useRef(false)

  useEffect(() => {
    const t0 = performance.now()
    const dur = 1500

    const finish = () => {
      if (done.current) return
      done.current = true
      setN(100)
      setLift(true)
      setTimeout(onDone, 900)
    }

    const id = setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / dur)
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
      setN(Math.round(eased * 100))
      if (p >= 1) {
        clearInterval(id)
        finish()
      }
    }, 40)

    // hard failsafe — never trap the user behind the curtain
    const failsafe = setTimeout(finish, 4000)

    return () => {
      clearInterval(id)
      clearTimeout(failsafe)
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink transition-transform duration-[900ms] ${
        lift ? '-translate-y-full' : ''
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
      aria-hidden="true"
    >
      <BrandLogo className="w-52 max-w-[70vw]" />
      <p className="mt-4 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-paper/50">
        The space for builders
      </p>
      <div className="mt-8 h-14 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brass/80">
        {BOOT_LINES.map((l, i) => (
          <p key={l} className={n >= (i + 1) * 22 ? 'opacity-100' : 'opacity-20'}>
            {l}
          </p>
        ))}
      </div>
      <p className="absolute bottom-10 right-10 font-mono text-5xl text-paper/80 md:text-6xl">
        {String(n).padStart(3, '0')}
      </p>
      <span className="absolute bottom-10 left-10 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper/40">
        EST. 2026 — IN
      </span>
    </div>
  )
}
