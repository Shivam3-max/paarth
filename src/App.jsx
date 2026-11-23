import { lazy, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './motion/Preloader.jsx'
import { PointerTracker, SmoothScroll, ScrollTrigger, lenisRef } from './motion/core.jsx'
import { glStore } from './gl/store.js'
import Home from './pages/Home.jsx'
import Masterclass from './pages/Masterclass.jsx'

const ParticleField = lazy(() => import('./gl/ParticleField.jsx'))

function webglOK() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

function ScrollReset() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.querySelector(hash)
        if (!el) return
        if (lenisRef.current) lenisRef.current.scrollTo(el, { immediate: true })
        else el.scrollIntoView()
      }, 120)
      return () => clearTimeout(t)
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname, hash])
  return null
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [gl] = useState(webglOK)

  useEffect(() => {
    document.documentElement.style.overflow = booted ? '' : 'hidden'
    if (booted) gsap.to(glStore, { intro: 1, duration: 2.6, ease: 'expo.out' })
  }, [booted])

  return (
    <>
      <SmoothScroll />
      <PointerTracker />
      {gl && (
        <Suspense fallback={null}>
          <ParticleField />
        </Suspense>
      )}
      {/* vignette over the particles */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,6,0.85) 100%)' }}
        aria-hidden="true"
      />
      {!booted && <Preloader onDone={() => setBooted(true)} />}

      <ScrollReset />
      <Nav />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home ready={booted} />} />
          <Route path="/masterclass" element={<Masterclass ready={booted} />} />
          {/* old routes from the previous site */}
          <Route path="/apply" element={<Navigate to="/masterclass" replace />} />
          <Route path="/admissions" element={<Navigate to="/masterclass" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
