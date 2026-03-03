import { useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Stroke band in viewport: left 18vw, width 64vw (18–82vw) — must match PollutionSection
const STROKE_START_VW = 18
const STROKE_WIDTH_VW = 64
// Model vertical offset in pollution section (higher = further up on screen)
const POLLUTION_MODEL_Y = 0.8

// --- Model Component ---
const ModelAndScene = () => {
    const { scene } = useGLTF('/concrete.glb')
    const modelRef = useRef<THREE.Group>(null)
    const { camera } = useThree()
    const projected = useRef(new THREE.Vector3())

    useEffect(() => {
      // Create a context for GSAP to easily revert all animations
      // Removed scope (modelRef) because we need to target DOM elements outside the canvas (#smoke-bg etc)
      const ctx = gsap.context(() => {
          if (!modelRef.current) return
      
          // Center the geometry internally
          const box = new THREE.Box3().setFromObject(scene)
          const center = box.getCenter(new THREE.Vector3())
          scene.position.sub(center)

          const mm = gsap.matchMedia()

          mm.add('(min-width: 800px)', () => {
              // --- Initial State (Hero) ---
              // Hero pose on the right – this is the "correct" starting state
              const initialScale = 12
              const setHeroState = () => {
                if (!modelRef.current) return
                modelRef.current.scale.set(initialScale, initialScale, initialScale)
                modelRef.current.rotation.set(0, 0, -0.4)
                modelRef.current.position.set(3, 0, 0)
              }

              // Ensure hero pose on mount
              setHeroState()

              // When ScrollTrigger recalculates (e.g. on load/resize), re-apply hero pose
              const onRefresh = () => {
                if (typeof window !== 'undefined' && window.scrollY === 0) {
                  setHeroState()
                }
              }

              ScrollTrigger.addEventListener('refresh', onRefresh)
              // Force an initial refresh so everything is in sync
              ScrollTrigger.refresh()

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
              
              // Move model to the Left side for Pollution section (and up a bit)
              // Use fromTo to ensure we always start from the hero position when reversing back up
              tlHeroToPollution.fromTo(
                modelRef.current!.position, 
                { x: 3, y: 0, z: 0 }, 
                { x: -6, y: POLLUTION_MODEL_Y, z: 0, ease: "none", immediateRender: false }
              )
              // Rotate it to look interesting
              .fromTo(
                modelRef.current!.rotation,
                { y: 0, z: -0.4 },
                { y: Math.PI * 2, z: 0.4, ease: "none", immediateRender: false },
                "<"
              )
              .fromTo(
                 modelRef.current!.scale,
                 { x: 12, y: 12, z: 12 },
                 { x: 6, y: 6, z: 6, ease: "none", immediateRender: false },
                 "<"
              )
              
              // Background Logic: Reveal Smoke City
              tlHeroToPollution.to("#smoke-bg", { opacity: 1, ease: "none" }, "<")
              // Ensure clean city is hidden
              tlHeroToPollution.set("#clean-bg", { opacity: 0 }, "<")


              // --- 2. While IN Pollution Section (Pinning) ---
              // Stroke is driven by model's *projected screen position*, not timeline progress (perspective makes progress ≠ screen position).
              const tlPollution = gsap.timeline({
                scrollTrigger: {
                    trigger: "#pollution-section",
                    start: "center center",
                    end: "+=2000",
                    pin: true,
                    scrub: 0.5,
                    immediateRender: false,
                    onUpdate(self) {
                      const strokeEl = document.getElementById("pollution-stroke")
                      if (!strokeEl || !modelRef.current) return
                      if (self.progress <= 0) {
                        gsap.set(strokeEl, { clipPath: "inset(0 100% 0 0 round 8px)" })
                        return
                      }
                      if (self.progress >= 1) {
                        gsap.set(strokeEl, { clipPath: "inset(0 0 0 0 round 8px)" })
                        return
                      }
                      modelRef.current.getWorldPosition(projected.current)
                      projected.current.project(camera)
                      const screenVw = (projected.current.x + 1) * 50
                      const reveal = Math.max(0, Math.min(1, (screenVw - STROKE_START_VW) / STROKE_WIDTH_VW))
                      const rightPct = 100 - reveal * 100
                      gsap.set(strokeEl, { clipPath: `inset(0 ${rightPct}% 0 0 round 8px)` })
                    },
                },
              })

              tlPollution.fromTo(
                modelRef.current!.position,
                { x: -6, y: POLLUTION_MODEL_Y, z: 0 },
                { x: 6, y: POLLUTION_MODEL_Y, z: 0, duration: 4, ease: "none", immediateRender: false }
              )
              tlPollution.fromTo(
                modelRef.current!.rotation,
                { y: Math.PI * 2, z: 0.4 },
                { y: Math.PI * 4, z: -0.4, duration: 4, ease: "none", immediateRender: false },
                "<"
              )
              
              // Background: Smoke -> Clean
              tlPollution.to("#smoke-bg", { opacity: 0, duration: 4, ease: "none" }, 1) 
              tlPollution.to("#clean-bg", { opacity: 1, duration: 4, ease: "none" }, 1)



               // --- 3. Transition to Solution Section ---
               // Model moves to final position and stops when solution section is in view.
               // end: "top top" = animation finishes when section enters viewport so concrete stays put.
               gsap.timeline({
                   scrollTrigger: {
                       trigger: "#solution-section",
                       start: "top bottom",
                       end: "top top", // Complete when section reaches top — concrete then stays in place
                       scrub: 0.5,
                       immediateRender: false
                  }
               })
               // Move to Right side (Positive X); final position is held for rest of scroll
               .fromTo(
                  modelRef.current!.position, 
                  { x: 6, y: POLLUTION_MODEL_Y, z: 0 }, // Start exactly where tlPollution ended
                  { x: 4.5, y: -0.5, z: 0, ease: "none", immediateRender: false }
               )
               // Scale up even more for impact?
               .fromTo(
                  modelRef.current!.scale,
                  { x: 6, y: 6, z: 6 }, // Previous scale was 6
                  { x: 12, y: 12, z: 12, ease: "none", immediateRender: false }, 
                  "<"
               )
               // Adjust rotation
               .fromTo(
                  modelRef.current!.rotation,
                  { y: Math.PI * 4, z: -0.4 }, // Previous rotation
                  { z: 0.4, y: Math.PI * 2, ease: "none", immediateRender: false }, // New rotation target
                  "<"
               )
              
              // Cleanup for this media query
              return () => {
                ScrollTrigger.removeEventListener('refresh', onRefresh)
              }
          })
      }) // Scope removed

      return () => ctx.revert(); 

    }, [scene, camera])
  
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
      <group ref={modelRef}>
          <primitive object={scene} />
      </group>
    )
  }

export default function Scene3DCanvas() {
  return (
    <div id="scene3d-canvas" className="fixed inset-0 pointer-events-none z-30">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        <ModelAndScene />
      </Canvas>
    </div>
  )
}
