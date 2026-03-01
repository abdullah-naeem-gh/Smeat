import HeroNew from '../components/HeroNew'
import SolutionSection from '../components/SolutionSection'
import DataSection from '../components/DataSection'
import ProductGrid from '../components/ProductGrid'
import PartnersSection from '../components/PartnersSection'
import Footer from '../components/Footer'
import PollutionSection from '../components/PollutionSection'
import Scene3DCanvas from '../components/Scene3D'
import cleanCity from '../assets/clean_city.png'
import smokeCity from '../assets/smoke_city.png'
import heroBg from '../assets/hero_bg.png'

const LandingPage = () => {
  return (
    <div className="landing-page relative">
       {/* Background Images for Pollution Section Effect - Higher Z-index to be seen, but behind content */}
       <div 
        id="hero-bg" 
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0 pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
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

      {/* White background panel for hero section only — absolute so it scrolls away with the hero,
           sits at z-5: above bg images (z-0) but below the 3D model (z-10) */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{ height: '100vh', zIndex: 5, background: '#ffffff' }}
      />

      {/* Global 3D Scene - Above background and content */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        <Scene3DCanvas />
      </div>

      {/* Content under the 3D concrete (Hero → Solution) so concrete can pass over stroke */}
      <div className="relative z-20">
        <HeroNew />
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
  )
}

export default LandingPage