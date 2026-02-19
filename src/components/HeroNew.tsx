import './HeroNew.css'

function HeroNew() {
  return (
    <div id="hero-section" className="relative w-full h-screen overflow-hidden bg-transparent">
      {/* Content Container - heavily simplified */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-12 md:px-24 pointer-events-none">
        
        {/* Main Text Content */}
        <div className="max-w-4xl space-y-8 pointer-events-auto">
          <div className="inline-block relative">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-gray-900 leading-none mb-2">
              CONCRETE
            </h1>
            <div className="h-2 w-full bg-forest absolute bottom-2 left-0 -z-10 origin-left transform scale-x-100 transition-transform duration-1000 ease-out"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-light text-gray-800 tracking-tight">
            THAT BREATHES
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-xl font-light leading-relaxed mt-6 border-l-4 border-[#288760] pl-6">
            Transforming urban pollution into clean air with revolutionary bio-concrete technology.
          </p>

          <div className="flex gap-6 pt-8">
            <button className="px-8 py-4 bg-forest text-white text-lg font-medium rounded-sm hover:bg-[#1f6b4c] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore Solution
            </button>
            <button className="px-8 py-4 border-2 border-gray-900 text-gray-900 text-lg font-medium rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Floating Stats/Badges */}
        <div className="absolute bottom-12 right-12 flex gap-8">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-xl border-l-4 border-forest">
            <div className="text-4xl font-bold text-gray-900">30%</div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wider mt-1">CO₂ Reduction</div>
          </div>
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-xl border-l-4 border-forest">
            <div className="text-4xl font-bold text-gray-900">100+</div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wider mt-1">Years Durability</div>
          </div>
        </div>

      </div>

      {/* Background Gradient Overlay to ensure text readability */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default HeroNew


