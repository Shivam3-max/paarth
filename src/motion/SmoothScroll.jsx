import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Lenis smooth scroll wired into GSAP's ticker + scroll-velocity image skew. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1.05 })
    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // scroll-velocity skew on images
    const proxy = { skew: 0 }
    const skewSetter = gsap.quickSetter('[data-skew]', 'skewY', 'deg')
    const clamp = gsap.utils.clamp(-2.2, 2.2)
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -420)
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew
          gsap.to(proxy, {
            skew: 0,
            duration: 0.7,
            ease: 'power3',
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          })
        }
      },
    })

    return () => {
      st.kill()
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return null
}
