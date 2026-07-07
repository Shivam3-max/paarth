import { lazy, Suspense, useEffect, useState } from 'react'

const Scene3D = lazy(() => import('./Scene3D.jsx'))

/** Lazy-loaded WebGL object — keeps three.js out of the main bundle.
 *  Renders nothing on touch/small screens and under reduced motion. */
export default function Lazy3D({ kind = 'ico', className = '' }) {
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    setOk(true)
  }, [])

  if (!ok) return null

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <Suspense fallback={null}>
        <Scene3D kind={kind} />
      </Suspense>
    </div>
  )
}
