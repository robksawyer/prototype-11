/**
 * @file MainScene.js
 */
import React, { Suspense, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import useErrorBoundary from 'use-error-boundary'

// import { useTweaks } from 'use-tweaks'
// import { useInView } from 'react-intersection-observer'
// import useMobileDetect from 'use-mobile-detect-hook'
import {
  extend,
  Canvas,
  useFrame,
  useThree,
  useLoader,
} from 'react-three-fiber'

// Enabled for effects
// import {
//   EffectComposer,
//   // Bloom,
//   // ChromaticAberration,
// } from '@react-three/postprocessing'

import * as THREE from 'three'
import { useHelper, Html, useTexture, OrbitControls } from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
// import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
// import { gsap } from 'gsap'

import styles from './MainScene.module.css'

import FaceMesh from './FaceMesh'
import Loader from '../Loader'

// Shader stack
import './shaders/defaultMaterial'

// Texture loading examples
// const envMap = useCubeTexture(
//   [
//     'sky_px.png',
//     'sky_nx.png',
//     'sky_py.png',
//     'sky_ny.png',
//     'sky_pz.png',
//     'sky_nz.png',
//   ],
//   { path: '/3d/sky0/' }
// )

// const bumpMap = useLoader(TextureLoader, '/3d/bumps/fabric-bump.png')
// bumpMap.wrapS = bumpMap.wrapT = RepeatWrapping
// bumpMap.repeat.set(1, 1)
//
// Application
// <meshStandardMaterial
//    envMap={envMap}
//    attach="material"
//    roughness={0}
//    metalness={0.9}
//    bumpMap={bumpMap}
//    color="#3083DC"
//  />

// Enable for effects in the main scene
// const Effects = () => {
//   return <EffectComposer></EffectComposer>
// }

const ENABLE_HELPERS = 0

const Scene = () => {
  const mesh = useRef()
  const { scene } = useThree()
  const group = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  const faceGroup = useRef()

  // Texture loading example
  const texture = useTexture('/3d/textures/checkerboard.jpg')
  // const texture = useLoader(
  //   THREE.TextureLoader,
  //   '/3d/textures/checkerboard.jpg'
  // )
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  useFrame(({ clock, mouse }) => {
    // mesh.current.rotation.x = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.rotation.y = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.rotation.z = (Math.sin(clock.elapsedTime) * Math.PI) / 4
    // mesh.current.position.x = Math.sin(clock.elapsedTime)
    // mesh.current.position.z = Math.sin(clock.elapsedTime)
    // group.current.rotation.y += 0.02

    faceGroup.current.position.z = THREE.MathUtils.lerp(
      faceGroup.current.position.z,
      faceGroup.current.position.z + Math.sin(clock.getElapsedTime()) * 0.15,
      0.01
    )

    // mesh.current.material.uniforms.mouse.value = new THREE.Vector2(
    //   mouse.x,
    //   mouse.y
    // )
  })

  // Spotlight follows the object.
  // useEffect(() => void (spotLight.current.target = mesh.current), [scene])

  if (ENABLE_HELPERS) {
    useHelper(spotLight, THREE.SpotLightHelper, 'teal')
    useHelper(pointLight, THREE.PointLightHelper, 0.5, 'hotpink')
    useHelper(mesh, THREE.BoxHelper, '#272740')
    useHelper(mesh, VertexNormalsHelper, 1, '#272740')
    // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')
  }

  const totalLines = 20

  return (
    <>
      <pointLight position={[-10, 0, -2]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="red"
          position={[4, 4, 0]}
          intensity={5}
        />
      </group>
      <spotLight
        castShadow
        position={[2, 5, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      />
      <group
        ref={faceGroup}
        position={[0, -0.05, -0.175]}
        scale={[0.045, 0.045, 0.045]}
      >
        <FaceMesh />
      </group>
      {/* Line geometry */}
      <group position={[0, 0, 0]}>
        {new Array(totalLines).fill(null).map((_, i) => (
          <mesh
            key={`line-${i}`}
            position={[0, (i - totalLines / 2) / totalLines / 2, 0]}
            castShadow
          >
            <planeGeometry attach="geometry" args={[1, 0.01, 100, 1]} />
            <defaultMaterial
              attach="material"
              side={THREE.DoubleSide}
              // time={0}
              texture1={texture}
              // resolution={new THREE.Vector4()}
              // uvRate1={new THREE.Vector2(1, 1)}
            />
          </mesh>
        ))}
      </group>

      <gridHelper args={[30, 30, 30]} />
    </>
  )
}

const MainScene = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  return (
    <ErrorBoundary>
      {/* https://github.com/pmndrs/react-three-fiber/blob/master/markdown/api.md#canvas */}
      <Canvas
        pixelRatio={window.devicePixelRatio || 1}
        colorManagement
        shadowMap
        camera={{ position: [-5, 5, 5] }}
        className={`${styles.main_scene} ${
          styles[`main_scene__${variant}`]
        } ${className}`}
        style={{
          width: '100vw',
          height: 'calc(100vh - 50px)',
          background: 'blue',
        }}
        onCreated={({ gl }) => {
          gl.physicallyCorrectLights = true
          // gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
        }}
      >
        <fog attach="fog" args={['floralwhite', 0, 20]} />
        <Suspense
          fallback={
            <Html center>
              <Loader />
            </Html>
          }
        >
          <Scene />
        </Suspense>

        {/* <Effects /> */}
        <OrbitControls />
      </Canvas>
    </ErrorBoundary>
  )
}

MainScene.propTypes = {
  // tagName: PropTypes.object,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
}

MainScene.defaultProps = {
  // tagName: Canvas,
  className: '',
  variant: 'default',
}

export default MainScene