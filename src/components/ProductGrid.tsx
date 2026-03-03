import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    title: 'AiroCoat Paint',
    description: 'Air-purifying emulsion paint designed for cities like Karachi and Lahore. Actively breaks down smog as it settles on walls.',
    price: 'RS 899/L',
    tag: 'Popular'
  },
  {
    title: 'AiroCrete / NanoCrete',
    description: 'Smog-eating concrete for high-altitude satellite views and urban infrastructure. The ultimate solution for industrial zones.',
    price: 'Custom Quote',
    tag: 'Industrial'
  },
  {
    title: 'SMEAT Pavers',
    description: 'Specialized pavers for roads, sidewalks, and kerbstones. Turning every street into a carbon-neutral walkway.',
    price: 'Contact for Pricing',
    tag: 'Infrastructure'
  }
]

const ProductGrid = () => {
  return (
    <section
      id="products-section"
      className="h-screen bg-white font-montserrat flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full pt-28 pb-12 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase">
              Products
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The Product Ecosystem
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-500 max-w-md">
            Our materials are designed to quietly integrate into roads, walls, and
            infrastructure while actively removing pollutants from the air.
          </p>
        </div>

        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 flex-1">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative p-7 rounded-3xl border border-neutral-200 bg-white transition-colors group overflow-hidden
                         hover:border-black hover:bg-black"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold tracking-[0.25em] text-neutral-500 uppercase group-hover:text-neutral-200">
                    {product.tag}
                  </p>
                  <h3 className="text-2xl font-semibold text-neutral-900 group-hover:text-white transition-colors">
                    {product.title}
                  </h3>
                </div>
                <span className="text-3xl font-medium text-neutral-300 group-hover:text-neutral-100">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
              </div>

              <p className="text-neutral-600 group-hover:text-neutral-200 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-neutral-100 group-hover:border-neutral-700">
                <span className="text-sm font-medium text-neutral-800 group-hover:text-white">
                  {product.price}
                </span>
                <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-400 text-neutral-700 group-hover:border-white group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ProductGrid
