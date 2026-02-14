import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const PollutionSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isInView = useInView(sectionRef, { 
        once: false,
        amount: 0.3 
    })

    useEffect(() => {
        if (!canvasRef.current || !isInView) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Particles (pollution dots)
        const particles: Array<{
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            life: number
        }> = []

        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                life: 1
            })
        }

        // Left side position (absorber - concrete cylinder)
        const centerX = canvas.width * 0.25  // Position on left side (25% from left)
        const centerY = canvas.height / 2
        const cylinderWidth = 200
        const cylinderHeight = 300

        let animationId: number

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw thin line art cylinder (side absorber)
            ctx.strokeStyle = 'rgba(40, 135, 96, 0.4)' // forest green with transparency
            ctx.lineWidth = 2

            // Front face ellipse
            ctx.beginPath()
            ctx.ellipse(centerX, centerY - cylinderHeight / 2, cylinderWidth / 2, 30, 0, 0, Math.PI * 2)
            ctx.stroke()

            // Vertical lines
            ctx.beginPath()
            ctx.moveTo(centerX - cylinderWidth / 2, centerY - cylinderHeight / 2)
            ctx.lineTo(centerX - cylinderWidth / 2, centerY + cylinderHeight / 2)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(centerX + cylinderWidth / 2, centerY - cylinderHeight / 2)
            ctx.lineTo(centerX + cylinderWidth / 2, centerY + cylinderHeight / 2)
            ctx.stroke()

            // Bottom ellipse
            ctx.beginPath()
            ctx.ellipse(centerX, centerY + cylinderHeight / 2, cylinderWidth / 2, 30, 0, 0, Math.PI * 2)
            ctx.stroke()

            // Draw and update particles (pollution dots)
            particles.forEach((particle, index) => {
                // Calculate direction to center
                const dx = centerX - particle.x
                const dy = centerY - particle.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Attraction to center (absorption effect)
                if (distance > 20) {
                    particle.vx += (dx / distance) * 0.1
                    particle.vy += (dy / distance) * 0.1
                } else {
                    // Particle absorbed - fade out and respawn
                    particle.life -= 0.02
                    if (particle.life <= 0) {
                        // Respawn at edge
                        const angle = Math.random() * Math.PI * 2
                        const spawnDistance = Math.max(canvas.width, canvas.height)
                        particle.x = centerX + Math.cos(angle) * spawnDistance / 2
                        particle.y = centerY + Math.sin(angle) * spawnDistance / 2
                        particle.vx = (Math.random() - 0.5) * 2
                        particle.vy = (Math.random() - 0.5) * 2
                        particle.life = 1
                    }
                }

                // Update position
                particle.x += particle.vx
                particle.y += particle.vy

                // Draw particle
                ctx.fillStyle = `rgba(40, 40, 40, ${particle.life * 0.7})`
                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fill()

                // Draw thin connection line to nearby particles
                particles.forEach((other, otherIndex) => {
                    if (otherIndex <= index) return
                    const dx2 = other.x - particle.x
                    const dy2 = other.y - particle.y
                    const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2)
                    
                    if (dist < 80) {
                        ctx.strokeStyle = `rgba(100, 100, 100, ${(1 - dist / 80) * 0.2})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(particle.x, particle.y)
                        ctx.lineTo(other.x, other.y)
                        ctx.stroke()
                    }
                })
            })

            animationId = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [isInView])

    return (
        <section 
            ref={sectionRef} 
            className="relative min-h-screen flex items-center justify-center bg-gray-50 py-24 overflow-hidden font-montserrat"
        >
            {/* Animated Canvas Background */}
            <canvas 
                ref={canvasRef}
                className="absolute inset-0 z-0 opacity-60"
            />

            {/* Content Overlay */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 flex justify-end">
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                        opacity: isInView ? 1 : 0,
                        y: isInView ? 0 : 30
                    }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="space-y-8 max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 border border-red-200 shadow-sm">
                        <AlertTriangle size={18} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Environmental Crisis</span>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                            A Global Crisis <br />
                            <span className="text-forest">on Our Doorstep</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-forest rounded-full" />
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
