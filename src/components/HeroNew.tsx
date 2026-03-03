import { useState } from 'react'
import { motion } from 'framer-motion'

function HeroNew() {
  const [hoverPrimary, setHoverPrimary] = useState(false)
  const [hoverSecondary, setHoverSecondary] = useState(false)

  return (
    <div
      id="hero-section"
      className="relative w-full h-screen bg-transparent overflow-hidden"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      {/* ── Left content ── */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center px-10 md:px-16 lg:px-20 pointer-events-none">
        <div className="max-w-[520px] pointer-events-auto">
          {/* Main heading */}
          <h1
            className="font-semibold text-[#1a1a1a] leading-[1.1] tracking-[-0.025em] mb-5"
            style={{ fontSize: 'clamp(38px, 5.5vw, 72px)' }}
          >
            Concrete that<br />cleans the air.
          </h1>

          {/* Description */}
          <p
            className="text-gray-500 font-normal leading-relaxed mb-10"
            style={{ fontSize: 'clamp(14px, 1.15vw, 17px)', maxWidth: '420px' }}
          >
            SMEAT develops smog-eating concrete and coatings
            that actively remove air pollutants, enabling cities
            to build cleaner infrastructure.
          </p>

          {/* CTA buttons — scale-X sweep hover (state-driven so hover always works) */}
          <div className="flex items-center gap-4 flex-wrap">
            <motion.button
              type="button"
              className="relative overflow-hidden rounded-lg px-7 py-3 bg-[#1a1a2e] font-medium"
              style={{ fontSize: '15px', letterSpacing: '0.01em' }}
              onMouseEnter={() => setHoverPrimary(true)}
              onMouseLeave={() => setHoverPrimary(false)}
            >
              <motion.div
                className="absolute inset-0 bg-white rounded-lg"
                style={{ transformOrigin: 'left center' }}
                animate={{ scaleX: hoverPrimary ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <motion.span
                className="relative z-10 block"
                animate={{ color: hoverPrimary ? '#000000' : '#ffffff' }}
                transition={{ duration: 0.2, delay: hoverPrimary ? 0.1 : 0 }}
              >
                Explore Technology
              </motion.span>
            </motion.button>
            <motion.button
              type="button"
              className="relative overflow-hidden rounded-lg px-7 py-3 font-medium"
              style={{ fontSize: '15px', letterSpacing: '0.01em', background: 'transparent', border: '1px solid #1a1a2e' }}
              onMouseEnter={() => setHoverSecondary(true)}
              onMouseLeave={() => setHoverSecondary(false)}
            >
              <motion.div
                className="absolute inset-0 bg-[#1a1a2e] rounded-lg -inset-px"
                style={{ transformOrigin: 'left center' }}
                animate={{ scaleX: hoverSecondary ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
              <motion.span
                className="relative z-10 block"
                animate={{ color: hoverSecondary ? '#ffffff' : '#1a1a2e' }}
                transition={{ duration: 0.2, delay: hoverSecondary ? 0.1 : 0 }}
              >
                View Research
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroNew


