import { motion } from 'framer-motion'
import { Paintbrush, Building2, LayoutGrid, ArrowRight } from 'lucide-react'

const products = [
  {
    title: 'AiroCoat Paint',
    description: 'Air-purifying emulsion paint designed for cities like Karachi and Lahore. Actively breaks down smog as it settles on walls.',
    price: 'RS 899/L',
    icon: Paintbrush,
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
    tag: 'Popular'
  },
  {
    title: 'AiroCrete / NanoCrete',
    description: 'Smog-eating concrete for high-altitude satellite views and urban infrastructure. The ultimate solution for industrial zones.',
    price: 'Custom Quote',
    icon: Building2,
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    tag: 'Industrial'
  },
  {
    title: 'SMEAT Pavers',
    description: 'Specialized pavers for roads, sidewalks, and kerbstones. Turning every street into a carbon-neutral walkway.',
    price: 'Contact for Pricing',
    icon: LayoutGrid,
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
    tag: 'Infrastructure'
  }
]

const ProductGrid = () => {
  return (
    <section className="py-24 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            The Product Ecosystem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our technology is integrated into the materials that build our cities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden"
            >
              {/* Tag */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                  {product.tag}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 ${product.color} ${product.iconColor} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <product.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{product.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-50">
                <span className="text-lg font-bold text-emerald-700">{product.price}</span>
                <button className="text-gray-400 group-hover:text-emerald-600 transition-colors">
                  <ArrowRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Note */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-16 bg-linear-to-r from-emerald-900 to-forest p-12 rounded-4xl text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full -ml-32 -mb-32 blur-3xl" />

          <div className="relative z-10 space-y-4">
            <h4 className="text-mint text-lg font-bold uppercase tracking-[0.2em]">Environmental Impact</h4>
            <p className="text-3xl md:text-4xl font-bold leading-tight max-w-4xl mx-auto">
              "1 km of our road can cut pollution for up to <span className="text-mint">10,000 cars</span> per month."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductGrid
