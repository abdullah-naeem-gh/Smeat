import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const partners = [
  'Hatch 8 (NSTP)',
  'British High Commission',
  'Zayn VC',
  'Ministry of Climate Change',
  'NUST'
]

const PartnersSection = () => {
  return (
    <section
      id="partners-section"
      className="bg-gray-50 font-montserrat overflow-hidden flex"
      style={{ height: 'calc(100vh - 88px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 w-full flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Strategic Partners <br />& Traction
            </h2>
            <div className="w-20 h-1.5 bg-emerald-600 rounded-full" />
          </div>
          <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl shadow-sm border border-emerald-100">
            <Award className="text-emerald-600" size={32} />
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Achievement</p>
              <p className="text-sm font-bold text-gray-800">Permanent Representation at GreenTech Hub, H12</p>
            </div>
          </div>
        </div>

        {/* Partners Rows */}
        <div className="mt-6 flex-1 flex flex-col border-y border-gray-200 divide-y divide-gray-200">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-600/0 to-emerald-500/0 group-hover:from-emerald-500/90 group-hover:via-emerald-600 group-hover:to-emerald-500/90 transition-colors duration-400" />
              <div className="relative flex items-center justify-between px-4 md:px-10 py-4 md:py-7">
                <span className="text-2xl md:text-4xl font-semibold tracking-tight text-gray-900 group-hover:text-white transition-colors duration-300">
                  {partner}
                </span>
                <div className="hidden md:flex items-center gap-3 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-gray-400 group-hover:text-white/80 transition-colors duration-300">
                  <span className="h-px w-10 bg-gray-300 group-hover:bg-white/60 transition-colors duration-300" />
                  <span>Partner</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default PartnersSection
