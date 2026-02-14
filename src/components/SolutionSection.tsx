import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { Zap, Cpu, Leaf } from 'lucide-react'
import { motion } from 'framer-motion'

const SolutionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<THREE.Group | null>(null)

  // Three.js Scene Setup
  useEffect(() => {
    if (!canvasRef.current) return

    const container = canvasRef.current
    const scene = new THREE.Scene()
    scene.background = null

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const loader = new GLTFLoader()
    loader.load('/concrete.glb', (gltf) => {
      const model = gltf.scene
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      model.position.sub(center)

      const group = new THREE.Group()
      group.add(model)
      
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 4.5 / maxDim
      group.scale.setScalar(scale)
      
      group.rotation.z = -25 * (Math.PI / 180)
      group.rotation.x = 0.3
      
      modelRef.current = group
      scene.add(group)
    })

    let animationFrameId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      if (modelRef.current) {
        const time = clock.getElapsedTime()
        
        // Pulse animation
        const pulse = 1 + Math.sin(time * 2) * 0.05
        modelRef.current.scale.setScalar(4.5 / 1 * pulse) // Adjust base scale as needed
        
        // Slow rotation
        modelRef.current.rotation.y += 0.005
      }
      
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: 3D Model Container */}
        <div className="relative h-[400px] lg:h-[600px] order-2 lg:order-1">
          <div 
            ref={canvasRef} 
            className="absolute inset-0 z-10"
          />
          {/* Subtle background glow for the model */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 z-0" />
        </div>

        {/* Right Side: Content */}
        <div className="order-1 lg:order-2 space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The SMEAT Solution
            </h2>
            <div className="w-20 h-1.5 bg-forest rounded-full" />
          </div>

          <div className="space-y-8">
            {/* Mechanism */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-mint/30 flex items-center justify-center text-emerald-700">
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
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-mint/30 flex items-center justify-center text-emerald-700">
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
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-xl bg-mint/30 flex items-center justify-center text-emerald-700">
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

      </div>
    </section>
  )
}

export default SolutionSection
