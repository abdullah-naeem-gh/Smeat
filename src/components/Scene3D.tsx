import { useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- Particles Component ---
const Particles = ({ targetRef }: { targetRef: React.RefObject<THREE.Group | null> }) => {
  const count = 3000
  const meshRef = useRef<THREE.Points>(null)
  
  // Create particles with random positions
  // We want them to form a cloud initially around the left side (pollution source)
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const initPos = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      // Cloud spread
      const x = (Math.random() - 0.5) * 15 - 5 // Start more to the left
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 5
      
      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      initPos[i * 3] = x
      initPos[i * 3 + 1] = y
      initPos[i * 3 + 2] = z
    }
    return [pos, initPos]
  }, [])
  
  useFrame(() => {
    if (!meshRef.current || !targetRef.current) return
    
    // Get target position (center of model)
    const targetPos = new THREE.Vector3()
    targetRef.current.getWorldPosition(targetPos)
    
    const positionsAttribute = meshRef.current.geometry.attributes.position
    
    for (let i = 0; i < count; i++) {
        let x = positionsAttribute.getX(i)
        let y = positionsAttribute.getY(i)
        let z = positionsAttribute.getZ(i)

        // Calculate vector to target
        const dx = targetPos.x - x
        const dy = targetPos.y - y
        const dz = targetPos.z - z
        
        const distSq = dx*dx + dy*dy + dz*dz

        if (distSq > 0.05) {
            // Stronger attraction force + some randomness for "cloud" effect
            // Lerp towards target to avoid lagging behind too much
            x += dx * 0.08  // Increased speed significantly
            y += dy * 0.08 
            z += dz * 0.08 
        } else {
            // Respawn relative to target to create a continuous stream or cycle
            // Or just respawn at random 'screen' position to simulate new pollution coming in
            const rndX = (Math.random() - 0.5) * 15
            const rndY = (Math.random() - 0.5) * 10
            
            // Bias respawn to the direction model is moving away from? 
            // Keep it simple: respawn around the current target but with offset
             x = targetPos.x + (Math.random() - 0.5) * 10
             y = targetPos.y + (Math.random() - 0.5) * 8
             z = targetPos.z + (Math.random() - 0.5) * 5
        }

        positionsAttribute.setXYZ(i, x, y, z)
    }
    
    positionsAttribute.needsUpdate = true
  })


  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#333"
        transparent
        opacity={0} 
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// --- Model Component ---
const ModelAndScene = () => {
    const { scene } = useGLTF('/concrete.glb')
    const modelRef = useRef<THREE.Group>(null)
    const particlesRef = useRef<THREE.Group>(null) 
    const particleTargetRef = useRef<THREE.Group>(null)
  
    useEffect(() => {
      // Create a context for GSAP to easily revert all animations
      // Removed scope (modelRef) because we need to target DOM elements outside the canvas (#smoke-bg etc)
      const ctx = gsap.context(() => {
          if (!modelRef.current) return
      
          // Center the geometry internally
          const box = new THREE.Box3().setFromObject(scene)
          const center = box.getCenter(new THREE.Vector3())
          scene.position.sub(center)

          const mm = gsap.matchMedia();

          mm.add("(min-width: 800px)", () => {
              
              // --- Initial State (Hero) ---
              // Massive scale as requested by user
              const initialScale = 12; // Increased from 3
              modelRef.current!.scale.set(initialScale, initialScale, initialScale)
              // Tilted slightly on Z so it appears sideways
              modelRef.current!.rotation.set(0, 0, -0.4) 
              // Start on the Right (positive X)
              modelRef.current!.position.set(3, 0, 0)

          
              // --- 1. Transition into Pollution Section ---
              // As we scroll from Hero into Pollution, the model should move/rotate
              // and the background should change to SMOKE.
              
              const tlHeroToPollution = gsap.timeline({
                scrollTrigger: {
                    trigger: "#pollution-section",
                    start: "top bottom", // When top of pollution section hits bottom of viewport
                    end: "top top",      // When top of pollution section hits top of viewport
                    scrub: 0.5,          // Reduced scrub for tighter control, less lag/jumping
                    immediateRender: false
                }
              })
              
              // Move model to the Left side for Pollution section
              // Use fromTo to ensure we always start from the hero position when reversing back up
              tlHeroToPollution.fromTo(modelRef.current!.position, 
                { x: 3, y: 0, z: 0 }, 
                { x: -6, y: 0, z: 0, ease: "none" }
              )
              // Rotate it to look interesting
              .fromTo(modelRef.current!.rotation,
                { y: 0, z: -0.4 },
                { y: Math.PI * 2, z: 0.4, ease: "none" },
                "<"
              )
              .fromTo(modelRef.current!.scale,
                 { x: 12, y: 12, z: 12 },
                 { x: 6, y: 6, z: 6, ease: "none" },
                 "<"
              )
              
              // Background Logic: Reveal Smoke City
              tlHeroToPollution.to("#smoke-bg", { opacity: 1, ease: "none" }, "<")
              // Ensure clean city is hidden
              tlHeroToPollution.set("#clean-bg", { opacity: 0 }, "<")


              // --- 2. While IN Pollution Section (Pinning) ---
              // This handles the transition from Smoke to Clean
              const tlPollution = gsap.timeline({
                scrollTrigger: {
                    trigger: "#pollution-section",
                    start: "center center",
                    end: "+=2000",
                    pin: true,
                    scrub: 0.5, // Reduced scrub
                    immediateRender: false 
                }
              })

              // Move model across screen or do something dynamic during the pollution cleaning process
              // Use fromTo to strictly define the start point matching previous timeline's end
              tlPollution.fromTo(modelRef.current!.position, 
                { x: -6 },
                { x: 6, duration: 4, ease: "none" }
              )
              tlPollution.fromTo(modelRef.current!.rotation,
                { y: Math.PI * 2, z: 0.4 }, 
                { y: Math.PI * 4, z: -0.4, duration: 4, ease: "none" }, 
                "<"
              )
              
              // Background: Smoke -> Clean
              tlPollution.to("#smoke-bg", { opacity: 0, duration: 4, ease: "none" }, 1) 
              tlPollution.to("#clean-bg", { opacity: 1, duration: 4, ease: "none" }, 1)

               // Particles (Pollution) Logic
               if (particlesRef.current) {
                   const points = particlesRef.current.children[0] as THREE.Points
                   if(points && points.material) {
                       const mat = points.material as THREE.PointsMaterial
                       // Fade particles in as we enter 'smoke' phase
                       tlPollution.to(mat, { opacity: 0.8, duration: 0.5, ease: "none" }, 0)
                       // Fade particles out as we enter 'clean' phase
                       tlPollution.to(mat, { opacity: 0, duration: 0.5, ease: "none" }, 3)
                   }
               }


               // --- 3. Transition to Solution Section ---
               // User wants model on the RIGHT side for Solution Section.
               // Content is on the Left.
               gsap.timeline({
                   scrollTrigger: {
                       trigger: "#solution-section",
                       start: "top bottom",
                       end: "center center",
                       scrub: 0.5, // Reduced scrub
                       immediateRender: false
                  }
               })
               // Move to Right side (Positive X)
               .fromTo(modelRef.current!.position, 
                  { x: 6, y: 0, z: 0 }, // Start exactly where tlPollution ended
                  { x: 4.5, y: -0.5, ease: "none" }
               )
               // Scale up even more for impact?
               .fromTo(modelRef.current!.scale,
                  { x: 6, y: 6, z: 6 }, // Previous scale was 6
                  { x: 12, y: 12, z: 12, ease: "none" }, 
                  "<"
               )
               // Adjust rotation
               .fromTo(modelRef.current!.rotation,
                  { y: Math.PI * 4, z: -0.4 }, // Previous rotation
                  { z: 0.4, y: Math.PI * 2, ease: "none" }, // New rotation target
                  "<"
               )

          })
      }) // Scope removed

      return () => ctx.revert(); 

    }, [scene])
  
    // Constant slight rotation for life
    // useFrame((_, delta) => {
    //   // Access direct object if possible, but GSAP might be controlling it. 
    //   // It's safer to only do this if not being scrubbed heavily? 
    //   // Or just add to the rotation value if not overwriting.
    //   // For now, let's leave it, gives it life.
    //   if (modelRef.current) {
    //       modelRef.current.rotation.y += delta * 0.05
    //   }
    // })
  
    return (
      <>
        <group ref={modelRef}>
            <primitive object={scene} />
            <group ref={particleTargetRef} />
        </group>
        <group ref={particlesRef}>
            <Particles targetRef={particleTargetRef} />
        </group>
      </>
    )
  }

export default function Scene3DCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <ModelAndScene />
      </Canvas>
    </div>
  )
}
