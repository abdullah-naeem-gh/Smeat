import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import logo from '../assets/Logo.png'
import './Hero.css'

function Hero() {
  const mountRef = useRef<HTMLDivElement>(null)
  const concreteModelRef = useRef<THREE.Group | null>(null) // MOVED: Hook called at top level

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    let isMounted = true

    // --- Simplified Renderer & Canvas Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    // Let Three.js manage the canvas size and style, which fixes the WebGL warning
    renderer.setSize(container.clientWidth, container.clientHeight)
    // Enable shadows
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap // Softer shadows
    renderer.shadowMap.autoUpdate = true
    container.appendChild(renderer.domElement)

    // --- Scene & Camera (Restored to Original) ---
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xfafafa)

    const aspect = container.clientWidth / container.clientHeight
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    camera.position.set(0, 7, 15)
    camera.lookAt(0, 6.5, 0)

    // --- Original Wall & Floor ---
    const wallColor = 0xE8E7E9
    const floorColor = 0x555555 // CHANGED: Lighter floor to make shadows visible

    const wallHeight = 50
    const wallWidth = 100
    const wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight)
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.5
    })
    const wall = new THREE.Mesh(wallGeometry, wallMaterial)
    wall.receiveShadow = true // CORRECT: Set on the mesh
    wall.position.set(0, wallHeight / 2, -5)
    scene.add(wall)

    const floorWidth = 100
    const floorDepth = 30
    const floorGeometry = new THREE.PlaneGeometry(floorWidth, floorDepth)
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: floorColor,
      roughness: 0.9,
      metalness: 0.1,
      transparent: true,
      opacity: 0.5
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.receiveShadow = true // CORRECT: Set on the mesh
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, 0, floorDepth / 2 - 5)
    scene.add(floor)

    // --- Lighting ---
    // Ambient light - reduced to make spotlight more dramatic
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(ambientLight)

    // Create Spotlight - Position it to illuminate the model
    // Model will be at approximately: (3.5, 6.5, 2.5)
    const spotLight = new THREE.SpotLight(0xffffff, 90) // Very bright white light
    
    // Position spotlight from top left
    spotLight.position.set(-35, 25, 2) // Top left position
    
    // CRITICAL: Point the target more towards the floor (lower Y position)
    // Base target position - will be modified by mouse movement
    const baseTargetPosition = new THREE.Vector3(3.5, 2, 2.5)
    spotLight.target.position.copy(baseTargetPosition)
    
    // CRITICAL: Add the target to the scene (this is often forgotten!)
    scene.add(spotLight.target)
    
    // Mouse tracking for dynamic spotlight target
    const mouse = { x: 0, y: 0 }
    const targetMouseOffset = { x: 0, y: 0 } // Smooth interpolated offset
    
    // Mouse drag tracking for model rotation (only Y-axis - vertical axis rotation)
    let isDragging = false
    const previousMousePosition = { x: 0, y: 0 }
    let modelRotationY = 0 // Store accumulated Y-axis rotation only
    
    // Configure spotlight properties - tighter, more focused beam
    spotLight.angle = Math.PI / 10 // ~18 degree cone angle (very focused, narrow beam)
    spotLight.penumbra = 0.1 // Very sharp edge for a clear spotlight circle
    spotLight.decay = 1 // Minimal decay (1 = no falloff, 2 = standard falloff)
    spotLight.distance = 0 // 0 = infinite distance
    
    // Enable shadow casting
    spotLight.castShadow = true
    
    // Configure shadow camera (PerspectiveCamera for SpotLight)
    spotLight.shadow.camera.near = 0.1
    spotLight.shadow.camera.far = 100
    spotLight.shadow.camera.fov = 18 // Narrower FOV to match the tighter spotlight angle
    
    // Shadow map resolution
    spotLight.shadow.mapSize.width = 2048
    spotLight.shadow.mapSize.height = 2048
    
    // Shadow quality settings
    spotLight.shadow.radius = 4 // Blur radius for softer shadow edges
    spotLight.shadow.bias = -0.0001 // Reduce shadow acne
    spotLight.shadow.normalBias = 0.02 // Additional bias for smoother shadows
    
    // CRITICAL: Update the target's matrix world after setting position
    spotLight.target.updateMatrixWorld()
    
    // Add spotlight to scene
    scene.add(spotLight)


    // --- Load Concrete GLB Model ---
    const loader = new GLTFLoader()
    const clock = new THREE.Clock()

    loader.load(
      '/concrete.glb',
      (gltf) => {
        if (!isMounted) return

        const model = gltf.scene
        
        // Scale and center the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        const maxDim = Math.max(size.x, size.y, size.z)
        const desiredSize = 4.5 // Final desired size
        const scale = desiredSize / maxDim
        model.scale.setScalar(scale)
        
        // Center the model geometry at the origin (within its local space)
        // This ensures rotation happens around the model's center
        model.position.set(-center.x, -center.y, -center.z).multiplyScalar(scale)

        // Apply initial rotation to match the design
        model.rotation.x = 0.6  // More tilt forward (was 0.4)
        model.rotation.y = 0.3  // Adjusted Y rotation (was 0.5)
        model.rotation.z = -0.4 // More clockwise tilt (was -0.2)
        
        // Traverse the model to enable shadow casting on each mesh
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true
          }
        })
        
        // Create a parent group to position the model in the scene
        // This allows rotation around the model's center while positioning it in the scene
        const modelGroup = new THREE.Group()
        modelGroup.add(model)
        
        // Position the group in the scene (model is centered at group origin)
        modelGroup.position.set(3.5, 6.5, 2.5) // Final position in scene
        
        // Store references
        concreteModelRef.current = modelGroup
        model.userData.modelGroup = modelGroup // Store group reference on model for easy access
        
        // Store initial rotation to preserve it
        if (model.userData.initialRotation === undefined) {
          model.userData.initialRotation = {
            x: model.rotation.x,
            y: model.rotation.y,
            z: model.rotation.z
          }
        }
        
        scene.add(modelGroup)
      },
      undefined,
      (error) => {
        console.error('An error occurred loading the model:', error)
      }
    )


    // --- Mouse Movement Handler ---
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMounted) return
      
      // Normalize mouse position to -1 to 1 range
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      
      // Handle model rotation when dragging (only Y-axis - vertical axis rotation)
      if (isDragging && concreteModelRef.current) {
        const deltaX = event.clientX - previousMousePosition.x
        
        // Rotate around vertical axis (Y-axis) - like spinning a cylinder
        modelRotationY += deltaX * 0.005 // Horizontal drag rotates around vertical axis
        
        previousMousePosition.x = event.clientX
        previousMousePosition.y = event.clientY
      }
    }
    
    // --- Mouse Down Handler (start drag) ---
    const handleMouseDown = (event: MouseEvent) => {
      if (!isMounted) return
      
      // Check if clicking on the canvas area
      const target = event.target as HTMLElement
      if (target === renderer.domElement || renderer.domElement.contains(target)) {
        isDragging = true
        previousMousePosition.x = event.clientX
        previousMousePosition.y = event.clientY
        renderer.domElement.style.cursor = 'grabbing'
      }
    }
    
    // --- Mouse Up Handler (end drag) ---
    const handleMouseUp = () => {
      if (!isMounted) return
      isDragging = false
      renderer.domElement.style.cursor = 'grab'
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    // Set initial cursor style
    renderer.domElement.style.cursor = 'grab'

    // --- Animation Loop ---
    const animate = () => {
      if (!isMounted) return
      requestAnimationFrame(animate)

      // Smooth interpolation for mouse movement (creates dynamic feel)
      const lerpFactor = 0.05 // Lower = smoother, slower response
      targetMouseOffset.x += (mouse.x - targetMouseOffset.x) * lerpFactor
      targetMouseOffset.y += (mouse.y - targetMouseOffset.y) * lerpFactor
      
      // Update spotlight target position based on mouse (subtle movement)
      const mouseInfluence = 3 // How much the mouse affects the target position
      spotLight.target.position.set(
        baseTargetPosition.x + targetMouseOffset.x * mouseInfluence,
        baseTargetPosition.y + targetMouseOffset.y * mouseInfluence * 0.5, // Less vertical movement
        baseTargetPosition.z
      )
      spotLight.target.updateMatrixWorld()

      // Add subtle floating animation and apply rotation
      if (concreteModelRef.current) {
        const modelGroup = concreteModelRef.current
        const model = modelGroup.children[0] // Get the actual model from the group
        
        // Store base Y position on the first frame (for the group)
        if (modelGroup.userData.baseY === undefined) {
          modelGroup.userData.baseY = modelGroup.position.y
        }
        // Apply floating motion to the group (up and down only)
        const elapsedTime = clock.getElapsedTime()
        modelGroup.position.y = modelGroup.userData.baseY + Math.sin(elapsedTime * 0.7) * 0.25
        
        // Apply rotation from mouse drag to the model (only Y-axis - vertical axis rotation)
        // Model is centered at group origin, so rotation happens around its center
        if (model && model.userData.initialRotation) {
          const initialRot = model.userData.initialRotation
          model.rotation.x = initialRot.x // Keep X rotation as initial
          model.rotation.y = initialRot.y + modelRotationY // Only rotate around Y-axis
          model.rotation.z = initialRot.z // Keep Z rotation as initial
        }
      }

      renderer.render(scene, camera)
    }
    animate()


    // --- Simplified Resize Handler ---
    const handleResize = () => {
      if (!isMounted || !container) return
      
      // Update camera aspect ratio
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      
      // Update renderer size
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', handleResize)


    // --- Cleanup ---
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
          // Ignore errors
        }
      }
      renderer.dispose()
      floorGeometry.dispose()
      floorMaterial.dispose()
      wallGeometry.dispose()
      wallMaterial.dispose()
      
      // Dispose of the loaded model
      if (concreteModelRef.current) {
        // concreteModelRef.current is now a group, traverse its children
        concreteModelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            // Material can be an array, so handle that
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      }
    }
  }, [])

  return (
    <div className="hero-container">
      {/* 3D Scene Container */}
      <div 
        ref={mountRef} 
        className="hero-scene"
      />
      
      {/* Content Overlay */}
      <div className="hero-content">
        {/* Header */}
        <header className="hero-header">
          <div className="hero-logo">
            <img src={logo} alt="SMEAT Logo" />
          </div>
          <button className="hero-menu-button" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>

        {/* Main Content */}
        <div className="hero-main">
          <div className="hero-text">
            <h1 className="hero-heading">
              Reinventing <br />
              Concrete for a Cleaner <br />
              Tomorrow
            </h1>
            <p className="hero-tagline">
              Pakistan's First Smog Eating Concrete
            </p>
            <button className="hero-cta-button">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero