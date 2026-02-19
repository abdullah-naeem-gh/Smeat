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

      {/* Global 3D Scene - Above background, below interactive content */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Scene3DCanvas />
      </div>

      {/* Page Content - Top layer */}
      <div className="relative z-20">
        <HeroNew />
        <PollutionSection />
        <SolutionSection />
        <DataSection />
        <ProductGrid />
        <PartnersSection />
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage