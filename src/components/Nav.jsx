import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import Logo from './Logo.jsx'
import { scrollToTarget, Magnetic } from '../motion/core.jsx'

const links = [
  { id: 'pillars', label: 'Skills' },
  { id: 'operator', label: '360°' },
  { id: 'business', label: 'Business' },
  { id: 'paths', label: 'For you' },
]

export default function Nav() {
  const bar = useRef(null)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const hide = y > last && y > 200 && !open
      gsap.to(bar.current, { yPercent: hide ? -130 : 0, duration: 0.6, ease: 'expo.out' })
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const go = (id) => {
    setOpen(false)
    if (pathname !== '/') navigate('/#' + id)
    else scrollToTarget('#' + id)
  }

  return (
    <>
      <header ref={bar} className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-8 md:pt-6">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full py-2 pl-5 pr-2">
          <Link to="/" aria-label="Paarth home" className="text-ivory">
            <Logo size="h-8 w-8" />
          </Link>
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="mono rounded-full px-4 py-2 text-ivory/70 transition-colors hover:bg-white/5 hover:text-ivory"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Magnetic>
                <Link to="/masterclass" className="btn btn-gold !py-3">
                  Free masterclass <span className="arrow">→</span>
                </Link>
              </Magnetic>
            </span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Menu"
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-white/5 lg:hidden"
            >
              <span className={`h-px w-5 bg-ivory transition-transform duration-500 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px w-5 bg-ivory transition-transform duration-500 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[75] flex flex-col justify-end bg-void/95 px-6 pb-12 backdrop-blur-xl transition-[clip-path] duration-700 lg:hidden ${
          open ? '[clip-path:circle(150%_at_90%_5%)]' : 'pointer-events-none [clip-path:circle(0%_at_90%_5%)]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
      >
        {links.map((l, i) => (
          <button
            key={l.id}
            onClick={() => go(l.id)}
            className="display border-b border-white/10 py-5 text-left text-4xl font-medium"
          >
            <span className="mono mr-4 align-middle text-gold">0{i + 1}</span>
            {l.label}
          </button>
        ))}
        <Link to="/masterclass" className="btn btn-gold mt-10 justify-center">
          Join the free masterclass <span className="arrow">→</span>
        </Link>
      </div>
    </>
  )
}
