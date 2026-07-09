import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { BrandMark } from './components/Shared.jsx'
import SmoothScroll from './motion/SmoothScroll.jsx'
import Cursor from './motion/Cursor.jsx'
import Preloader from './motion/Preloader.jsx'
import SideRail from './motion/SideRail.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Experience from './pages/Experience.jsx'
import WhatWeTeach from './pages/WhatWeTeach.jsx'
import Marketing from './pages/Marketing.jsx'
import AI from './pages/AI.jsx'
import BusinessLeadership from './pages/BusinessLeadership.jsx'
import Curriculum from './pages/Curriculum.jsx'
import Program from './pages/Program.jsx'
import Admissions from './pages/Admissions.jsx'
import Founder from './pages/Founder.jsx'
import Apply from './pages/Apply.jsx'

function getBooted() {
  try {
    return sessionStorage.getItem('paarth-booted') === '1'
  } catch {
    return false
  }
}

function setBootedFlag() {
  try {
    sessionStorage.setItem('paarth-booted', '1')
  } catch {
    // Storage can be unavailable in private or locked-down browser contexts.
  }
}

export default function App() {
  const location = useLocation()
  const [display, setDisplay] = useState(location)
  const [phase, setPhase] = useState('idle') // idle | cover | reveal
  const [booted, setBooted] = useState(getBooted)
  const timers = useRef([])

  // page-transition curtain
  useEffect(() => {
    if (location.pathname === display.pathname) {
      setDisplay(location)
      return
    }
    setPhase('cover')
    timers.current.forEach(clearTimeout)
    timers.current = [
      setTimeout(() => {
        setDisplay(location)
        window.scrollTo(0, 0)
        setPhase('reveal')
      }, 520),
      setTimeout(() => setPhase('idle'), 1350),
    ]
    return () => timers.current.forEach(clearTimeout)
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.documentElement.style.overflow = booted ? '' : 'hidden'
  }, [booted])

  return (
    <>
      <SmoothScroll />
      <Cursor />
      {!booted && (
        <Preloader
          onDone={() => {
            setBootedFlag()
            setBooted(true)
          }}
        />
      )}

      {/* route-transition curtain */}
      <div
        className={`pointer-events-none fixed inset-0 z-[85] flex items-center justify-center bg-ink transition-transform duration-[650ms] ${
          phase === 'cover' ? 'translate-y-0' : phase === 'reveal' ? '-translate-y-full' : 'translate-y-full'
        } ${phase === 'idle' ? '!transition-none' : ''}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)' }}
        aria-hidden="true"
      >
        <BrandMark textClassName="text-paper md:text-4xl" iconClassName="h-10 w-10" />
      </div>

      {booted && (
        <div className="flex min-h-screen flex-col">
          <Nav />
          <SideRail />
          {/* layout grid overlay */}
          <div
            className="pointer-events-none fixed inset-x-0 top-0 z-[15] mx-auto hidden h-full max-w-6xl justify-between px-6 md:px-10 lg:flex"
            aria-hidden="true"
          >
            {[...Array(5)].map((_, i) => (
              <span key={i} className="h-full w-px bg-ink/[0.04]" />
            ))}
          </div>
          <main className="relative z-10 flex-1 bg-paper">
            <Routes location={display}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/what-we-teach" element={<WhatWeTeach />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/business-leadership" element={<BusinessLeadership />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/program" element={<Program />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/apply" element={<Apply />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
