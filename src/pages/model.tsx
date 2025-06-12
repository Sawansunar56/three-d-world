import "./model.css"
import {
  FBXLoader,
  GLTFLoader,
  RectAreaLightHelper,
} from "three/examples/jsm/Addons.js"
import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Group } from "three"
import { TextureLoader } from "three"
import { Environment, OrbitControls, useAnimations, useHelper } from "@react-three/drei"
import { RoomEnvironment } from "three/examples/jsm/Addons.js"
import * as THREE from "three"
import { DirectionalLightHelper } from "three"

const RoomEnvironmentSetup = () => {
  const { gl, scene } = useThree()

  useMemo(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl)
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture
    pmremGenerator.dispose()
  }, [gl, scene])

  return null
}

// THINK: Look at gsap also. it seems it would work here as recommended by chatgpt
function CameraController({ target }: { target: any }) {
  const { camera } = useThree()
  const vec = new THREE.Vector3()
  const moving = useRef(false)

  useEffect(() => {
    if (target) {
      moving.current = true
    }
  }, [target])

  useFrame(() => {
    // console.log('targetPosition: ', targetPosition)
    // console.log(target);
    if (target && moving.current) {
      // console.log('targetPosition: ', targetPosition)
      // console.log('moving: ', moving)
      // Lerp camera position
      camera.position.lerp(vec.copy(target.position), 0.05)

      // Look at origin (or any target)
      camera.lookAt(target.lookAt)

      // Stop when close enough
      if (camera.position.distanceTo(target.position) < 0.1) {
        moving.current = false
      }
    }
  })

  return null
}

// function Model({ scene, animations }: { scene: any, animations: any }) {
//   const animationName = "CINEMA_4D_Main"
//   const group = useRef<Group>(null)
//   console.log(animations);
//
//   const { actions, mixer } = useAnimations(animations, group);
//
//   const previousAction = useRef<any>(null);
//
//   useEffect(() => {
//     if (!actions || !animationName) return
//
//     const currentAction = actions[animationName]
//     if (!currentAction) return
//
//     // Fade from previous to new action
//     if (previousAction.current && previousAction.current !== currentAction) {
//       previousAction.current.fadeOut(0.5)
//     }
//
//     currentAction
//       .reset()
//       .fadeIn(0.5)
//       .play()
//
//     previousAction.current = currentAction
//   }, [animationName, actions])
//
//
//   // useFrame(() => {
//   //   if (ref.current) {
//   //     ref.current.rotation.y += 0.003
//   //   }
//   // })
//
//   return (
//     <group ref={group}>
//       <primitive object={scene} position={[0, 0, 500]} />
//     </group>
//   )
// }

const textureBasePath = "models/fantasy_character/textures/"
const availableTextures = [
  "BellBlack_emissive.png",
  "Bell_emissive.png",
  "Bicep_emissive.png",
  "Birdfeeder_emissive.png",
  "Blue_emissive.png",
  "BrassDark_emissive.png",
  "BrassLLight_emissive.png",
  "BrassLight_emissive.png",
  "Calf_emissive.png",
  "Collar_emissive.png",
  "Dots_1_emissive.png",
  "Dots_emissive.png",
  "Elbow22_emissive.png",
  "Elbow_emissive.png",
  "Flap_emissive.png",
  "Forearm_emissive.png",
  "Hand_Right_emissive.png",
  "Head_emissive.png",
  "Jewel_emissive.png",
  "Knob2_emissive.png",
  "Knobs_emissive.png",
  "LeftHand_emissive.png",
  "LightPurple_emissive.png",
  "LowerTorso_emissive.png",
  "Medal_emissive.png",
  "Neck_emissive.png",
  "Necklace01_emissive.png",
  "Necklace02_emissive.png",
  "NoseColor_emissive.png",
  "Nose_emissive.png",
  "Purple_1_emissive.png",
  "Shadow_emissive.png",
  "Shoe_emissive.png",
  "Shoulder_0_emissive.png",
  "Shoulder_emissive.png",
  "Staff_emissive.png",
  "Thigh_emissive.png",
  "UpperTorso_emissive.png",
  "Waist_emissive.png",
  "material_emissive.png",
]

function EmissiveModel({
  scene,
  animations,
  textures,
  scale,
  positions,
  material,
}: {
  scene: any
  animations: any
  textures: any
  scale: any
  positions: any
  material: any
}) {
  const animationName = "CINEMA_4D_Main"
  const group = useRef<Group>(null)

  const { actions, mixer } = useAnimations(animations, group)

  const previousAction = useRef<any>(null)

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && material) {
        // console.log(child)
        // console.log(material)
        // console.log("Mesh Name:", child.name)
        // console.log("Material:", child.material)
        if (material.chicken) {
          child.material = material.chicken
          child.material.chicken.needsUpdate = true
        }
      }
    })
  }, [scene])

  useEffect(() => {
    if (!actions || !animationName) return

    const currentAction = actions[animationName]
    if (!currentAction) return

    // Fade from previous to new action
    if (previousAction.current && previousAction.current !== currentAction) {
      previousAction.current.fadeOut(0.5)
    }

    currentAction.reset().fadeIn(0.5).play()

    previousAction.current = currentAction
  }, [animationName, actions])

  return (
    <group ref={group}>
      <primitive object={scene} position={positions} scale={scale} />
    </group>
  )
}

export function FBXModel({ url }: { url: string }) {
  const fbx = useLoader(FBXLoader, url)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)

  useEffect(() => {
    if (fbx.animations.length > 0) {
      const mixer = new THREE.AnimationMixer(fbx)
      const action = mixer.clipAction(fbx.animations[0])
      action.play()
      mixerRef.current = mixer
    }

    // Enable shadows if needed
    fbx.traverse((child: any) => {
      if (child.isMesh && child.material) {
        console.log("Material:", child.material)

        if (child.material.map) {
          console.log("Has diffuse map ✅:", child.material.map)
        } else {
          console.warn("⚠️ No diffuse map on:", child.name)
        }
      }
    })
  }, [fbx])

  // Update animation each frame
  useFrame((_, delta) => {
    mixerRef.current?.update(delta)
  })

  return <primitive object={fbx} />
}

function ModelCusLoad(path: string) {
  return useLoader(GLTFLoader, path)
}

function CusScene({ moveCamera, target }: { moveCamera: any; target: any }) {
  const pachecho = ModelCusLoad("/models/pachecho/pachecho.glb")
  const chicken = ModelCusLoad("/models/chicken/chick_stylized_character.glb")
  const controls = useRef<any>(null)
  const { camera } = useThree()
  console.log(chicken.nodes);
  const emissionTextures = useLoader(
    TextureLoader,
    availableTextures.map((name) => `${textureBasePath}${name}`)
  )

  // useFrame(() => {
  //   if (controls.current) {
  //     console.log(camera.position);
  //     console.log(controls.current.target);
  //   }
  //
  // })

  // const pochenko_light_place = new THREE.Vector3(0, 100, -500);
  // <directionalLight position={values} color="white" intensity={5} />

  const lightRef = useRef(null)
  useEffect(() => {
    if (lightRef.current) {
      const helper = new RectAreaLightHelper(lightRef.current)
      lightRef.current.add(helper)
    }
  }, [])
  const values = new THREE.Vector3(500, 0, 800)
  const back_light = new THREE.Vector3(0, 0, 400)
  const direc_value = new THREE.Vector3(0, 500, 500);
  // const light_s = useRef<THREE.DirectionalLightHelper>(null!)
  // const light_x = useRef<THREE.DirectionalLightHelper>(null!)

  const light_s = useRef<RectAreaLightHelper>(null!)
  const light_x = useRef<RectAreaLightHelper>(null!)

  // useHelper(light_s, DirectionalLightHelper, 1, 'hotpink');
  // useHelper(light_x, DirectionalLightHelper, 1, 'hotpink');
  useHelper(light_s, RectAreaLightHelper, 1);
  useHelper(light_x, RectAreaLightHelper, 1);

  return (
    <>
      {/* <CameraController target={target} /> */}
      <ambientLight intensity={1} />
      <directionalLight position={direc_value} color="white" intensity={3} />
      {/* <directionalLight ref={light_x} position={back_light} color="red" intensity={300} /> */}
      <rectAreaLight
        ref={light_s}
        color="white"
        intensity={10}
        position={values}
        width={200}
        height={200}
        rotation={[-Math.PI / 1, 2.3, 0]}
      />
      <rectAreaLight
        ref={light_x}
        color="red"
        intensity={50}
        position={back_light}
        width={200}
        height={200}
        rotation={[-Math.PI / 1, 0, 0]}
      />
      <EmissiveModel
        material={chicken.materials}
        scene={chicken.scene}
        animations={chicken.animations}
        textures={emissionTextures}
        scale={[2000, 2000, 2000]}
        positions={[0, 0, 500]}
      />
      <EmissiveModel
        material={pachecho.materials}
        scene={pachecho.scene}
        animations={pachecho.animations}
        textures={emissionTextures}
        scale={[10, 10, 10]}
        positions={[400, 0, 500]}
      />
      <mesh position={back_light}>
        {/* <sphereGeometry args={[80, 32, 32]} /> */}
        <meshStandardMaterial />
      </mesh>
      <Environment preset={"city"} blur={1}
        environmentIntensity={1}
      />
      {/* <FBXModel url="/models/fantasy_character_fbx/source/Fantasy_Character_24.fbx" /> */}
      {/* <FBXModel url="/models/pachecho/source/Stylized_Final_Low_10.fbx" /> */}
      <OrbitControls makeDefault ref={controls} />
    </>
  )
}

export default function ThreeDSection({
  moveCamera,
  target,
}: {
  moveCamera: any
  target: any
}) {
  return (
    <div className="three-d-section">
      <Canvas
        camera={{ position: [0, 500, 1200], fov: 45, near: 0.1, far: 5000 }}
        gl={{
          // toneMappingExposure: -0.5,
          toneMappingExposure: 1,
        }}
      >
        <CusScene moveCamera={moveCamera} target={target} />
      </Canvas>
    </div>
  )
}
