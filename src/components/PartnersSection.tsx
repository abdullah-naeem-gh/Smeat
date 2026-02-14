import { motion } from 'framer-motion'
import { Award, Globe2, Building } from 'lucide-react'

const partners = [
  'Hatch 8 (NSTP)',
  'British High Commission',
  'Zayn VC',
  'Ministry of Climate Change',
  'NUST'
]

const PartnersSection = () => {
  return (
    <section className="py-24 bg-gray-50 font-montserrat overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
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

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white aspect-video rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all cursor-pointer group"
            >
              <span className="text-gray-400 group-hover:text-emerald-700 font-bold text-center transition-colors">
                {partner}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Global Impact Teaser */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-emerald-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <Globe2 size={48} className="text-mint opacity-80" />
              <h3 className="text-3xl font-bold">Scaling for the Future</h3>
              <p className="text-emerald-100/80 leading-relaxed text-lg">
                With the support of national and international bodies, SMEAT is moving beyond R&D into large-scale urban implementation across Pakistan's major cities.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
          </div>

          <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm flex flex-col justify-center">
            <div className="space-y-6">
              <Building size={48} className="text-emerald-600" />
              <h3 className="text-3xl font-bold text-gray-900">National Infrastructure</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Our technology is being vetted for use in Pakistan's primary highway networks and major housing developments to combat the rising urban smog crisis.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PartnersSection
