import { useState } from 'react'
import { motion } from 'framer-motion'
import logoImg from '../assets/Logo.png'

const NAV_ITEMS = [
  { label: 'Technology', href: '#solution-section' },
  { label: 'Data', href: '#data-section' },
  { label: 'Products', href: '#products-section' },
  { label: 'Partners', href: '#partners-section' },
  { label: 'Contact', href: '#contact-section' }
]

function Header() {
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="flex items-center justify-between px-10 py-6 pointer-events-auto bg-gray-100/70">
        <div className="flex items-center">
          <img src={logoImg} alt="SMEAT" className="h-7 w-auto object-contain" />
        </div>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item, index) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative overflow-hidden rounded-full py-1.5 px-4 block text-[15px] font-normal"
                style={{ letterSpacing: '0.01em' }}
                onMouseEnter={() => setHoveredNavIndex(index)}
                onMouseLeave={() => setHoveredNavIndex(null)}
              >
                <motion.div
                  className="absolute inset-0 bg-[#1a1a2e] rounded-full"
                  style={{ transformOrigin: 'left center' }}
                  animate={{ scaleX: hoveredNavIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <motion.span
                  className="relative z-10 block"
                  animate={{
                    color: hoveredNavIndex === index ? '#ffffff' : 'rgb(75 85 99)'
                  }}
                  transition={{ duration: 0.2, delay: hoveredNavIndex === index ? 0.1 : 0 }}
                >
                  {item.label}
                </motion.span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header

