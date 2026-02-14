import HeroNew from '../components/HeroNew'
import SolutionSection from '../components/SolutionSection'
import DataSection from '../components/DataSection'
import ProductGrid from '../components/ProductGrid'
import PartnersSection from '../components/PartnersSection'
import Footer from '../components/Footer'
import PollutionSection from '../components/PollutionSection'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroNew />
      <PollutionSection />
      <SolutionSection />
      <DataSection />
      <ProductGrid />
      <PartnersSection />
      <Footer />
    </div>
  )
}

export default LandingPage