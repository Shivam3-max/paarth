import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BrandMark } from './Shared.jsx'

const teachLinks = [
  { to: '/what-we-teach', label: 'Overview' },
  { to: '/marketing', label: 'Marketing' },
  { to: '/ai', label: 'AI' },
  { to: '/business-leadership', label: 'Business Leadership' },
  { to: '/curriculum', label: 'The Curriculum' },
]

const mainLinks = [
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/program', label: 'Flagship Program' },
  { to: '/admissions', label: 'Admissions' },
  { to: '/founder', label: 'Founder' },
]

const DISHA_URL = import.meta.env.VITE_DISHA_URL || 'http://127.0.0.1:3464'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
    setDropOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  const linkCls = ({ isActive }) =>
    `link-rule text-[0.82rem] font-medium tracking-wide transition-colors ${
      isActive ? 'text-brass' : 'text-ink hover:text-brass-deep'
    }`

  const teachActive = teachLinks.some((l) => location.pathname === l.to)

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled ? 'border-line bg-paper/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <span
        className="absolute left-0 top-0 h-[2px] bg-brass transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between px-6 md:px-10">
        <Link to="/" className="shrink-0" aria-label="Paarth home">
          <BrandMark iconClassName="h-8 w-8" />
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          <div
            className="relative"
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <button
              className={`link-rule flex cursor-pointer items-center gap-1.5 text-[0.82rem] font-medium tracking-wide transition-colors ${
                teachActive ? 'text-brass' : 'text-ink hover:text-brass-deep'
              }`}
              aria-expanded={dropOpen}
              onClick={() => setDropOpen((v) => !v)}
            >
              What We Teach
              <svg className={`h-3 w-3 transition-transform ${dropOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
            {dropOpen && (
              <div className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-4">
                <div className="border hairline bg-paper p-2 shadow-[0_18px_50px_-18px_rgba(27,26,23,0.28)]">
                  {teachLinks.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-[0.82rem] font-medium transition-colors ${
                          isActive ? 'bg-cream text-brass-deep' : 'text-ink hover:bg-cream'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {mainLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkCls}>
              {l.label}
            </NavLink>
          ))}

          <a
            href={DISHA_URL}
            className="link-rule text-[0.82rem] font-medium tracking-wide text-ink transition-colors hover:text-brass-deep"
          >
            Disha
          </a>

          <Link
            to="/apply"
            className="bg-ink px-5 py-2.5 text-[0.8rem] font-semibold tracking-wide text-paper transition-colors hover:bg-brass-deep"
          >
            Apply Now
          </Link>
        </div>

        <button
          className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-ink transition-transform ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-ink transition-transform ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="border-t hairline bg-paper px-6 pb-8 pt-4 xl:hidden">
          <p className="eyebrow pt-2">What We Teach</p>
          <div className="mt-2 space-y-1">
            {teachLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className="block py-2 font-display text-xl">
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-6 space-y-1 border-t hairline pt-4">
            {mainLinks.map((l) => (
              <NavLink key={l.to} to={l.to} className="block py-2 font-display text-xl">
                {l.label}
              </NavLink>
            ))}
            <a href={DISHA_URL} className="block py-2 font-display text-xl">
              Disha
            </a>
          </div>
          <Link to="/apply" className="mt-6 inline-block bg-ink px-6 py-3 text-sm font-semibold text-paper">
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  )
}
