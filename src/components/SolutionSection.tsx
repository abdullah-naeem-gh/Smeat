import { useRef } from 'react'
import { Zap, Cpu, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'
import classNames from 'classnames'

const SolutionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="solution-section" ref={containerRef} className="relative min-h-screen bg-transparent py-24 overflow-hidden pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left Side: Content (Swapped from order-2 to order-1 for lg screens) */}
        <div className="order-2 lg:order-1 space-y-12 pointer-events-auto">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The SMEAT Solution
            </h2>
            <div className="w-20 h-1.5 bg-[#288760] rounded-full" />
          </div>

          <div className="space-y-8">
            {/* Mechanism */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#cbf3e1] flex items-center justify-center text-emerald-700">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mechanism</h3>
                <p className="text-gray-600 leading-relaxed">
                  We use non-doped additive materials with a unique crystalline structure.
                </p>
              </div>
            </motion.div>

            {/* The Process */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#cbf3e1] flex items-center justify-center text-emerald-700">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Process</h3>
                <p className="text-gray-600 leading-relaxed">
                  These additives create Reactive Oxygen Species (ROS) that break down harmful pollutants like NOx​ and VOCs into safe atmospheric compounds.
                </p>
              </div>
            </motion.div>

            {/* The Benefit */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#cbf3e1] flex items-center justify-center text-emerald-700">
                <Leaf size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">The Benefit</h3>
                <p className="text-gray-600 leading-relaxed">
                  No energy required, no hefty costs. It works just by being there.
                </p>
              </div>
            </motion.div>
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
