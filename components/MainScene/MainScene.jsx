/**
 * @file MainScene.js
 *
 * @references
 *    WebGLRenderTarget / https://codesandbox.io/s/r3f-render-target-qgcrx
 */
import React, { Suspense, useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import useErrorBoundary from 'use-error-boundary'

// import { useTweaks } from 'use-tweaks'
// import { useInView } from 'react-intersection-observer'
// import useMobileDetect from 'use-mobile-detect-hook'

// Enabled for effects
// import {
//   EffectComposer,
//   // Bloom,
//   // ChromaticAberration,
// } from '@react-three/postprocessing'

import * as THREE from 'three'
import { Canvas, useFrame, createPortal, useThree } from 'react-three-fiber'
import {
  useHelper,
  Html,
  useTexture,
  OrbitControls,
  PerspectiveCamera,
  Stats,
} from '@react-three/drei'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
// import { FaceNormalsHelper } from 'three/examples/jsm/helpers/FaceNormalsHelper'
// import { gsap } from 'gsap'

import styles from './MainScene.module.css'

import FaceMesh from './FaceMesh'
import Loader from '../Loader'

// Shader stack
import './shaders/defaultShaderMaterial'

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

const FaceContent = ({ target }) => {
  const scene = useRef()
  const cam = useRef()
  const faceGroup = useRef()
  const { size, camera: defaultCamera, setDefaultCamera } = useThree()

  // useEffect(() => void setDefaultCamera(cam.current), [])

  useFrame(({ gl, clock, mouse }) => {
    // cam.current.updateMatri
    // gl.autoClear = true

    faceGroup.current.position.z = THREE.MathUtils.lerp(
      faceGroup.current.position.z,
      faceGroup.current.position.z + Math.sin(clock.getElapsedTime()) * 0.15,
      0.01
    )

    // render scene into target
    gl.setRenderTarget(target)
    // gl.render(scene.current, cam.current)
  }, 100)

  return (
    <scene ref={scene}>
      <perspectiveCamera
        ref={cam}
        aspect={size.width / size.height}
        position={[-2, 2, 2]}
        fov={70}
        radius={(size.width + size.height) / 4}
        near={0.01}
        far={5}
        onUpdate={(self) => self.updateProjectionMatrix()}
      />
      <group
        ref={faceGroup}
        position={[0, -0.05, -0.175]}
        scale={[0.045, 0.045, 0.045]}
      >
        <FaceMesh />
      </group>

      {/* {createPortal(
        <group
          ref={faceGroup}
          position={[0, -0.05, -0.175]}
          scale={[0.045, 0.045, 0.045]}
        >
          <FaceMesh />
        </group>,
        mainScene
      )} */}
    </scene>
  )
}

const Content = ({ target }) => {
  const mesh = useRef()
  const scene = useRef()

  const { camera } = useThree()

  const totalLines = 20

  if (ENABLE_HELPERS) {
    useHelper(mesh, THREE.BoxHelper, '#272740')
    useHelper(mesh, VertexNormalsHelper, 1, '#272740')
    // useHelper(mesh, FaceNormalsHelper, 0.5, '#272740')
  }

  useFrame(({ gl, scene, camera }) => {
    // gl.autoClear = true
    // render post FX
    mesh.current.material.uniforms.depthInfo.value = target.texture
    // console.log('mesh.current.material', mesh.current.material)
    // mesh.current.material.uniforms.tDiffuse.value = target.texture

    gl.setRenderTarget(null)
    // gl.render(scene.current, camera)
  }, 10)

  return (
    <scene ref={scene}>
      <mesh ref={mesh} position={[0, 0, 0]}>
        <planeGeometry attach="geometry" args={[1, 1, 100, 1]} />
        <defaultShaderMaterial
          attach="material"
          side={THREE.DoubleSide}
          cameraNear={camera.near}
          cameraFar={camera.far}
          time={0}
          depthInfo={target.texture}
          // resolution={new THREE.Vector4()}
          // uvRate1={new THREE.Vector2(1, 1)}
        />
      </mesh>
      {/* Line geometry */}
      {/* <group position={[0, 0, 0]}>
        {new Array(totalLines).fill(null).map((_, i) => (
          <mesh
            key={`line-${i}`}
            position={[0, (i - totalLines / 2) / totalLines / 2, 0]}
            castShadow
          >
            <planeGeometry attach="geometry" args={[1, 0.01, 100, 1]} />
            <defaultShaderMaterial
              attach="material"
              side={THREE.DoubleSide}
              depth={null}
              // time={0}
              texture1={texture}
              // resolution={new THREE.Vector4()}
              // uvRate1={new THREE.Vector2(1, 1)}
            />
          </mesh>
        ))}
      </group> */}
    </scene>
  )
}

const Everything = () => {
  const group = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  const { size } = useThree()

  // Create a render target with depth texture
  const [target] = useMemo(() => {
    // Generate a render target
    const target = new THREE.WebGLRenderTarget(size.width, size.height)
    target.texture.format = THREE.RGBFormat
    target.texture.minFilter = THREE.NearestFilter
    target.texture.magFilter = THREE.NearestFilter
    target.texture.generateMipmaps = false
    target.stencilBuffer = false
    target.depthBuffer = true
    target.depthTexture = new THREE.DepthTexture()
    target.depthTexture.format = THREE.DepthFormat
    target.depthTexture.type = THREE.UnsignedShortType

    return [target]
  }, [])

  console.log('target', target)

  // Texture loading example
  // const texture = useTexture('/3d/textures/checkerboard.jpg')
  // const texture = useLoader(
  //   THREE.TextureLoader,
  //   '/3d/textures/checkerboard.jpg'
  // )
  // texture.wrapS = texture.wrapT = THREE.RepeatWrapping

  // Spotlight follows the object.
  // useEffect(() => void (spotLight.current.target = mesh.current), [scene])

  if (ENABLE_HELPERS) {
    useHelper(spotLight, THREE.SpotLightHelper, 'teal')
    useHelper(pointLight, THREE.PointLightHelper, 0.5, 'hotpink')
  }

  return (
    <>
      <pointLight position={[-1, 0, 1]} color="lightblue" intensity={2.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="yellow"
          position={[4, 4, -3]}
          intensity={3}
        />
      </group>
      <spotLight
        castShadow
        position={[1, 1, 2]}
        ref={spotLight}
        angle={0.5}
        distance={20}
      />
      {/* Main scene containing depth information. */}
      <FaceContent target={target} />
      {/* Scene using the depth information */}
      <Content target={target} />
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
        camera={{ position: [-2, 2, 2] }}
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
          // gl.outputEncoding = THREE.sRGBEncoding
        }}
      >
        <fog attach="fog" args={['blue', 0, 20]} />
        <Suspense
          fallback={
            <Html center>
              <Loader />
            </Html>
          }
        >
          <Everything />
        </Suspense>

        {/* <Effects /> */}
        <OrbitControls />
        <Stats
          showPanel={0} // Start-up panel (default=0)
          className="" // Optional className to add to the stats container dom element
          // {...props} // All stats.js (https://github.com/mrdoob/stats.js/) props are valid
        />
        <Stats
          showPanel={1} // Start-up panel (default=0)
          className="ml-80" // Optional className to add to the stats container dom element
          // {...props} // All stats.js (https://github.com/mrdoob/stats.js/) props are valid
        />
        <Stats
          showPanel={2} // Start-up panel (default=0)
          className="ml-160" // Optional className to add to the stats container dom element
          // {...props} // All stats.js (https://github.com/mrdoob/stats.js/) props are valid
        />
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
