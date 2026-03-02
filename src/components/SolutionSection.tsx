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
    <section id="solution-section" ref={containerRef} className="relative min-h-screen bg-white py-24 overflow-hidden pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        
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
                className="space-y-2"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {point.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {point.text}
                </p>
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
