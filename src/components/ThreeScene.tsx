import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null)
  const frameIdRef = useRef<number>()
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer | null
    geometry: THREE.BoxGeometry | null
    material: THREE.MeshStandardMaterial | null
  }>({
    renderer: null,
    geometry: null,
    material: null
  })

  useEffect(() => {
    if (!mountRef.current) return

    let isMounted = true

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000000)
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    sceneRef.current.renderer = renderer
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add a cube with a material that responds to lighting
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    sceneRef.current.geometry = geometry
    
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00,
      metalness: 0.3,
      roughness: 0.4
    })
    sceneRef.current.material = material
    
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    // Position camera at an angle to see the 3D effect
    camera.position.set(3, 3, 5)
    camera.lookAt(0, 0, 0)

    // Animation loop - using a clock for better timing
    const clock = new THREE.Clock()
    
    const animate = () => {
      if (!isMounted) return
      
      frameIdRef.current = requestAnimationFrame(animate)
      
      // Rotate the cube based on elapsed time
      const elapsedTime = clock.getElapsedTime()
      cube.rotation.x = elapsedTime * 0.5
      cube.rotation.y = elapsedTime * 0.8
      
      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      if (!isMounted) return
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      isMounted = false
      window.removeEventListener('resize', handleResize)
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current)
      }
      
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement)
        } catch (e) {
          // Element might already be removed
        }
      }
      
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
}

export default ThreeScene

