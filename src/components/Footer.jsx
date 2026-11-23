import { Link } from 'react-router-dom'
import { LogoMark } from './Logo.jsx'
import { CONTACT } from '../config.js'

export default function Footer() {
  return (
    <footer data-gl="6,0,-1.5,1.1,0.55" className="relative z-10 overflow-hidden border-t border-white/10 pt-20">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="max-w-sm">
            <LogoMark className="h-12 w-12 text-ivory" />
            <p className="serif mt-6 text-3xl leading-tight text-ivory/90">
              Lead. Market. Build with AI. <span className="text-gold">Become 360°.</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <Link to="/masterclass" className="mono text-ivory/70 hover:text-gold">Free masterclass</Link>
            <Link to="/#pillars" className="mono text-ivory/70 hover:text-gold">What we teach</Link>
            {CONTACT.dishaUrl && (
              <a href={CONTACT.dishaUrl} className="mono text-ivory/70 hover:text-gold">Disha</a>
            )}
            {CONTACT.email && (
              <a href={`mailto:${CONTACT.email}`} className="mono text-ivory/70 hover:text-gold">{CONTACT.email}</a>
            )}
          </div>
        </div>
      </div>
      <p
        className="display pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[17vw] font-bold leading-[0.78] tracking-[-0.06em] text-transparent"
        style={{ WebkitTextStroke: '1px rgba(241,238,230,0.14)', backgroundImage: 'linear-gradient(to bottom, rgba(233,180,76,0.18), transparent 80%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
        aria-hidden="true"
      >
        PAARTH
      </p>
      <div className="mx-auto flex max-w-7xl justify-between px-5 py-6 md:px-10">
        <p className="mono text-dim">© {new Date().getFullYear()} Paarth</p>
        <p className="mono text-dim">Building legacies</p>
      </div>
    </footer>
  )
}
