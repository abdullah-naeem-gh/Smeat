import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const PollutionSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { 
        once: false,
        amount: 0.3 
    })

    return (
        <section 
            id="pollution-section"
            ref={sectionRef} 
            className="relative min-h-screen flex items-center justify-center bg-transparent py-24 overflow-hidden font-montserrat"
        >
            {/* Content Overlay */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 flex justify-end w-full pointer-events-none">
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                        opacity: isInView ? 1 : 0,
                        y: isInView ? 0 : 30
                    }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="space-y-8 max-w-4xl pointer-events-auto"
                >

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 border border-red-200 shadow-sm">
                        <AlertTriangle size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Environmental Crisis</span>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                            A Global Crisis <br />
                            <span className="text-[#288760]">on Our Doorstep</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-[#288760] rounded-full" />
                    </div>

                    <p className="text-xl text-gray-700 max-w-2xl font-medium">
                        Air pollution is no longer a distant threat—it's the silent killer claiming thousands of lives every year.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                        <div className="p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
                            <h3 className="text-5xl font-bold text-gray-900 mb-2">265,000</h3>
                            <p className="text-gray-600 font-medium">
                                Pakistanis die every year from air pollution
                            </p>
                        </div>

                        <div className="p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg">
                            <h3 className="text-5xl font-bold text-gray-900 mb-2">68,100</h3>
                            <p className="text-gray-600 font-medium">
                                Children under 5 among the victims
                            </p>
                        </div>

                        <div className="p-8 bg-red-50 backdrop-blur-md rounded-2xl border border-red-200 shadow-lg">
                            <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">Lahore, Nov 2024</p>
                            <h3 className="text-5xl font-bold text-red-700 mb-2">1,900</h3>
                            <p className="text-gray-600 font-medium">
                                AQI (Safe: ~100)
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

export default PollutionSection
