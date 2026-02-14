import { motion } from 'framer-motion'
import { TrendingDown, CheckCircle2 } from 'lucide-react'

const DataSection = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden font-montserrat">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Proven Efficiency
              </h2>
              <div className="w-20 h-1.5 bg-emerald-600 rounded-full" />
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Our technology isn't just a promise. It's validated performance through rigorous lab testing.
            </p>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <TrendingDown size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">60-70% Reduction</h3>
                <p className="text-gray-600">
                  Coated samples exhibit a 60-70% reduction in pollutants within a single day of exposure.
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {['ISO Standardized Testing', 'Real-time NOx Monitoring', 'VOC Breakdown Analysis'].map((item, i) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                >
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: The Graph */}
          <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <h4 className="text-lg font-bold text-gray-800 mb-8 text-center uppercase tracking-wider">
              SMEAT Exposure Chamber Reduction
            </h4>
            
            <div className="relative h-[300px] w-full mt-10">
              {/* Y-Axis Labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 font-bold pr-4 border-r border-gray-100">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Graph Lines & Bars */}
              <div className="absolute inset-0 ml-12">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gray-200" />
                
                <div className="flex h-full items-end justify-around px-8">
                  {/* Before */}
                  <div className="relative flex flex-col items-center group">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: '90%' }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="w-16 bg-gray-200 rounded-t-lg"
                    />
                    <span className="mt-4 text-sm font-bold text-gray-500 uppercase">Standard</span>
                  </div>

                  {/* After */}
                  <div className="relative flex flex-col items-center group">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: '30%' }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="w-16 bg-linear-to-t from-emerald-600 to-mint rounded-t-lg shadow-lg"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5 }}
                      className="absolute -top-10 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md"
                    >
                      -70% Reduction
                    </motion.div>
                    <span className="mt-4 text-sm font-bold text-emerald-700 uppercase">SMEAT Tech</span>
                  </div>
                </div>

                {/* Grid Lines */}
                {[0.25, 0.5, 0.75].map((level) => (
                  <div 
                    key={level}
                    className="absolute w-full h-px bg-gray-50 border-t border-dashed border-gray-200"
                    style={{ bottom: `${level * 100}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-xs text-gray-400 font-medium italic">
                *Data based on controlled exposure chamber tests with NOx and VOC concentrations.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DataSection
