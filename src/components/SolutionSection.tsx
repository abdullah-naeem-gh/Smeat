import { useRef } from 'react'
import { motion } from 'framer-motion'

const SolutionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const points = [
    {
      title: 'Mechanism',
      text: 'We use non-doped additive materials with a unique crystalline structure that activates under daylight.',
    },
    {
      title: 'The Process',
      text: 'These additives generate Reactive Oxygen Species (ROS), which break down harmful pollutants such as NOx and VOCs into safe atmospheric compounds.',
    },
    {
      title: 'The Benefit',
      text: 'No energy input, no ongoing cost. The material works passively—it just needs to be present.',
    },
  ]

  return (
    <section id="solution-section" ref={containerRef} className="relative h-screen bg-white overflow-hidden pointer-events-none flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        
        <div className="order-2 lg:order-1 space-y-12 pointer-events-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            The SMEAT Solution
          </h2>

          <div className="space-y-8">
            {points.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative flex items-start gap-4 rounded-xl bg-white/60 p-5 transition duration-300 ease-out hover:bg-white"
              >
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-white">
                  <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-0.5">
                    ➜
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-emerald-700">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {point.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Placeholder for 3D Model (Swapped from order-1 to order-2 for lg screens) */}
        <div className="relative h-[400px] lg:h-[600px] order-1 lg:order-2 flex items-center justify-center">
             {/* Model will appear here via Scene3D scaling/positioning */}
        </div>

      </div>
    </section>
  )
}

export default SolutionSection
