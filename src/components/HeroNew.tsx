import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import logo from '../assets/Logo.png'
import './HeroNew.css'

function HeroNew() {
  const mountRef = useRef<HTMLDivElement>(null)
  const modelGroupRef = useRef<THREE.Group | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    let isMounted = true

    /* ========== Renderer ========== */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    // Use ACES filmic tone mapping for natural, non-blown-out lighting
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0
    container.appendChild(renderer.domElement)

    /* ========== Scene & Camera ========== */
    const scene = new THREE.Scene()
    const aspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    camera.position.set(0, 5, 17)
    camera.lookAt(0, 4.5, 0)

    /* ========== Shadow-catching floor (nearly invisible — design has no visible shadow) ========== */
    const floorGeo = new THREE.PlaneGeometry(100, 100)
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.03 })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1
    floor.receiveShadow = true
    scene.add(floor)

    /* ========== Lighting — strong directional from upper-left, like the design ========== */
    const modelPos = new THREE.Vector3(5.5, 4.2, 0)

    // Ambient — very low, just prevents pure black
    const ambient = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambient)

    // Hemisphere light — soft sky/ground fill to keep it natural
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xb0b0b0, 0.3)
    scene.add(hemiLight)

    // Key light — strong, from upper-left (creates the bright highlight visible in the design)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(-8, 14, 10)
    keyLight.target.position.copy(modelPos)
    scene.add(keyLight.target)
    scene.add(keyLight)

    // Fill light — softer, from the right, prevents right side from going too dark
    const fillLight = new THREE.DirectionalLight(0xf0ece4, 0.5)
    fillLight.position.set(10, 6, 5)
    fillLight.target.position.copy(modelPos)
    scene.add(fillLight.target)
    scene.add(fillLight)

    // Rim light — subtle edge highlight from behind
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.35)
    rimLight.position.set(0, 10, -10)
    rimLight.target.position.copy(modelPos)
    scene.add(rimLight.target)
    scene.add(rimLight)

    // Spotlight — very subtle, just a hint of shadow
    const spotLight = new THREE.SpotLight(0xffffff, 15)
    spotLight.position.set(-6, 20, 5)
    spotLight.target.position.set(5.5, 0, 0)
    spotLight.angle = Math.PI / 6
    spotLight.penumbra = 1.0
    spotLight.decay = 2
    spotLight.distance = 0
    spotLight.castShadow = true
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.radius = 8
    spotLight.shadow.bias = -0.0001
    spotLight.shadow.normalBias = 0.02
    scene.add(spotLight.target)
    scene.add(spotLight)

    /* ========== Mouse tracking ========== */
    const mouse = { x: 0, y: 0 }
    const smoothMouse = { x: 0, y: 0 }
    let modelRotationY = 0
    let isDragging = false
    const prevMouse = { x: 0, y: 0 }

    /* ========== Load concrete model ========== */
    const loader = new GLTFLoader()
    const clock = new THREE.Clock()

    loader.load(
      '/concrete.glb',
      (gltf) => {
        if (!isMounted) return

        const model = gltf.scene

        // Center the geometry around origin
        const rawBox = new THREE.Box3().setFromObject(model)
        const rawCenter = rawBox.getCenter(new THREE.Vector3())
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.translate(-rawCenter.x, -rawCenter.y, -rawCenter.z)
          }
        })
        model.position.set(0, 0, 0)

        // Scale to desired size — slightly reduced prominence
        const sizeBox = new THREE.Box3().setFromObject(model)
        const size = sizeBox.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const desiredSize = 6.8
        const scaleFactor = desiredSize / maxDim
        model.scale.setScalar(scaleFactor)

        // Fix materials — natural concrete with visible specular highlights
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.roughness = 0.45 // Lower = more visible highlights from directional light
              child.material.metalness = 0.05  // Slight metallic for subtle reflections
              child.material.envMapIntensity = 0.3
            }
          }
        })

        // Create pivot group
        const group = new THREE.Group()
        group.add(model)

        // Center model within the group
        const groupBox = new THREE.Box3().setFromObject(model)
        const groupCenter = groupBox.getCenter(new THREE.Vector3())
        model.position.sub(groupCenter)

        // Scale the group
        const gSize = groupBox.getSize(new THREE.Vector3())
        const gMax = Math.max(gSize.x, gSize.y, gSize.z)
        group.scale.setScalar(desiredSize / gMax)

        // Apply tilt (~25° clockwise)
        group.rotation.set(0, 0, -25 * (Math.PI / 180))

        // Position bottom-right of viewport (matching design)
        group.position.set(5.5, 4.2, 0)

        modelGroupRef.current = group
        scene.add(group)
      },
      undefined,
      (err) => console.error('Model load error:', err)
    )

    /* ========== Event handlers ========== */
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMounted) return
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

      if (isDragging && modelGroupRef.current) {
        modelRotationY += (e.clientX - prevMouse.x) * 0.005
        prevMouse.x = e.clientX
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (!isMounted) return
      if (e.target === renderer.domElement) {
        isDragging = true
        prevMouse.x = e.clientX
        renderer.domElement.style.cursor = 'grabbing'
      }
    }

    const handleMouseUp = () => {
      if (!isMounted) return
      isDragging = false
      renderer.domElement.style.cursor = 'grab'
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    renderer.domElement.style.cursor = 'grab'

    /* ========== Animation loop ========== */
    const animate = () => {
      if (!isMounted) return
      requestAnimationFrame(animate)

      // Smooth mouse interpolation
      const lerp = 0.04
      smoothMouse.x += (mouse.x - smoothMouse.x) * lerp
      smoothMouse.y += (mouse.y - smoothMouse.y) * lerp

      // Subtle key light follows mouse (small range)
      keyLight.position.set(
        -8 + smoothMouse.x * 4,
        14 + smoothMouse.y * 2,
        10
      )

      // Model floating + auto-rotation
      if (modelGroupRef.current) {
        const group = modelGroupRef.current

        if (group.userData.baseY === undefined) {
          group.userData.baseY = group.position.y
        }

        const t = clock.getElapsedTime()
        group.position.y = group.userData.baseY + Math.sin(t * 0.7) * 0.2

        // Inner model rotation (spin around its own axis)
        if (group.children.length > 0) {
          modelRotationY += 0.004
          group.children[0].rotation.y = modelRotationY
        }
      }

      renderer.render(scene, camera)
    }
    animate()

    /* ========== Resize ========== */
    const handleResize = () => {
      if (!isMounted || !container) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    /* ========== Cleanup ========== */
    return () => {
      isMounted = false
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)

      if (container && renderer.domElement) {
        try {
          container.removeChild(renderer.domElement)
        } catch {
          /* already removed */
        }
      }
      renderer.dispose()
      floorGeo.dispose()
      floorMat.dispose()

      if (modelGroupRef.current) {
        modelGroupRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      }
    }
  }, [])

  return (
    <section className="hero-new">
      {/* Three.js canvas mount */}
      <div ref={mountRef} className="hero-new__scene" />

      {/* Content overlay */}
      <div className="hero-new__overlay">
        {/* Header */}
        <header className="hero-new__header">
          <div className="hero-new__logo">
            <img src={logo} alt="SMEAT" />
          </div>
          <button className="hero-new__menu" aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </header>

        {/* Main content — left side */}
        <main className="hero-new__main">
          <p className="hero-new__label">
            [ &nbsp;SUSTAINABLE MATERIAL TECHNOLOGY&nbsp; ]
          </p>
          <h1 className="hero-new__heading">
            Reinventing Concrete
            <br />
            for a <span className="hero-new__highlight">Cleaner</span>
            <br />
            Tomorrow.
          </h1>
          <p className="hero-new__tagline">
            Pakistan's First Smog Eating Concrete
          </p>
          <button className="hero-new__cta">Contact Us</button>
        </main>
      </div>
    </section>
  )
}

export default HeroNew
