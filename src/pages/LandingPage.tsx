import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import HeroNew from '../components/HeroNew'
import SolutionSection from '../components/SolutionSection'
import DataSection from '../components/DataSection'
import ProductGrid from '../components/ProductGrid'
import PartnersSection from '../components/PartnersSection'
import Footer from '../components/Footer'
import PollutionSection from '../components/PollutionSection'
import Header from '../components/Header'
import cleanCity from '../assets/clean_city.png'
import smokeCity from '../assets/smoke_city.png'

const Scene3DCanvas = lazy(() => import('../components/Scene3D'))

const HeroSection = ({ scrollY }: { scrollY: number }) => (
  <section
    className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden z-20"
    style={{
      transform: `translateY(${-scrollY * 0.3}px)`,
    }}
  >
    {/* White background panel for hero section only — scrolls with the hero */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: '#ffffff', zIndex: 5 }}
    />

    {/* Hero content (text + CTAs) */}
    <div className="relative w-full h-full z-20">
      <HeroNew />
    </div>
  </section>
)

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0)
  const lastScrollY = useRef(0)
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Track scroll position for hero parallax, clamped to hero height
      const heroHeight = window.innerHeight || 1
      const clamped = Math.max(0, Math.min(currentScrollY, heroHeight))
      setScrollY(clamped)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Defer loading of heavy 3D / model chunk until after initial paint
  useEffect(() => {
    if (typeof window === 'undefined') return

    const start = () => setShowScene(true)

    const w = window as Window & typeof globalThis & {
      requestIdleCallback?: (cb: () => void) => number
    }

    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(start)
      return
    }

    const timeoutId = window.setTimeout(start, 800)
    return () => window.clearTimeout(timeoutId)
  }, [])

  return (
    <div className="landing-page relative">
      <Header />

      {/* Background Images for Pollution Section Effect - Higher Z-index to be seen, but behind content */}
      <div
        id="smoke-bg"
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0 opacity-0 pointer-events-none"
        style={{ backgroundImage: `url(${smokeCity})` }}
      />
      <div
        id="clean-bg"
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0 opacity-0 pointer-events-none"
        style={{ backgroundImage: `url(${cleanCity})` }}
      />

      {/* Global 3D Scene - Above background and content */}
      {showScene && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          <Suspense fallback={null}>
            <Scene3DCanvas />
          </Suspense>
        </div>
      )}

      {/* Hero (parallax) + scrollable content beneath */}
      <div className="relative w-full min-h-screen">
        <HeroSection scrollY={scrollY} />

        {/* Content under the 3D concrete (Pollution → Solution) so concrete can pass over stroke */}
        <div className="relative z-20 bg-transparent">
          <PollutionSection />
          <SolutionSection />
        </div>

        {/* Sections after Solution sit above the canvas so the concrete goes behind and disappears */}
        <div className="relative z-40">
          <DataSection />
          <ProductGrid />
          <PartnersSection />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default LandingPage