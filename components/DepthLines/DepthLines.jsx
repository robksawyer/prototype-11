/**
 * @file DepthLines.js
 */
import React, { forwardRef, useRef, useMemo, createRef, useEffect } from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { useResource, useFrame, useUpdate } from 'react-three-fiber'

// import { Instances, Instance } from '../Instances'

import { useFBO } from '../../hooks/useFBO'

import styles from './DepthLines.module.css'

// Shader stack
import './shaders/defaultShaderMaterial'

// eslint-disable-next-line react/display-name
const InstancedPlane = React.forwardRef(
  ({ i, camera1, camera2, progress, target1, target2, ...props }, ref) => {
    // const dummy = new THREE.Object3D()

    const geometry = useUpdate(
      (geometry) => {
        const { i } = geometry.userData
        let y = []
        let len = geometry.attributes.position.array.length
        for (let j = 0; j < len / 3; j++) {
          y.push(i / 100)
        }
        geometry.setAttribute(
          'y',
          new THREE.BufferAttribute(new Float32Array(y), 1)
        )

        // geometry.attributes.y.needsUpdate = true
      },
      [] // execute only if these properties change
    )

    const material = useUpdate(
      (material) => {
        // console.log('material', material)
      },
      [] // execute only if these properties change
    )

    useFrame(({ gl, scene, clock }) => {
      // render post FX
      material.current.uniforms.depthInfo.value = target1.depthTexture
      material.current.uniforms.cameraNear.value = camera1.near
      material.current.uniforms.cameraFar.value = camera1.far
      material.current.uniforms.time.value = clock.getElapsedTime()
      material.current.needsUpdate = true
    })

    return (
      <mesh ref={ref} position={[0, (i - 50) / 50, 0]}>
        <planeBufferGeometry
          ref={geometry}
          attach="geometry"
          args={[2, 0.005, 300, 1]}
          userData={{ i }}
        />
        <defaultShaderMaterial
          attach="material"
          ref={material}
          side={THREE.DoubleSide}
          cameraNear={camera1.near}
          cameraFar={camera1.far}
          progress={progress}
          depthInfo={target1.depthTexture}
          depthWrite={true}
        />
      </mesh>
    )
  }
)

const DepthLines = (props) => {
  const {
    tagName: Tag,
    className,
    variant,
    children,
    progress,
    camera1,
    camera2,
  } = props

  const amount = 100

  const mesh = createRef()
  // Note: Without depth material added to scene as an override the performance
  // suffers tremendously. Why is that?
  // const depthMaterial = new THREE.MeshDepthMaterial({
  //   depthPacking: THREE.BasicDepthPacking,
  // })

  // console.log('depthMaterial', depthMaterial)

  let format = THREE.DepthFormat
  let type = THREE.UnsignedShortType

  let target1 = useFBO({
    settings: {
      // stencilBuffer: false,
      depthBuffer: true,
      depthTexture: new THREE.DepthTexture(),
    },
  })

  target1.texture.format = THREE.RGBFormat
  target1.texture.minFilter = THREE.NearestFilter
  target1.texture.magFilter = THREE.NearestFilter
  target1.texture.generateMipmaps = false

  target1.depthTexture.type = type
  target1.depthTexture.format = format

  let target2 = useFBO({
    settings: {
      depthBuffer: true,
      type: THREE.UnsignedShortType,
      depthTexture: new THREE.DepthTexture(),
    },
  })

  target2.texture.format = THREE.RGBFormat
  // target2.texture.minFilter = THREE.NearestFilter
  // target2.texture.magFilter = THREE.NearestFilter
  target2.texture.generateMipmaps = false

  target2.depthTexture.type = type
  target2.depthTexture.format = format

  // console.log('target1', target1)
  // console.log('target2', target2)

  useFrame(({ gl, scene, clock }) => {
    gl.autoClear = true
    // scene.overrideMaterial = depthMaterial
    gl.setRenderTarget(target1)

    gl.render(scene, camera2)

    // Post fx here

    // Clear the render target and the overrided scene material
    scene.overrideMaterial = null
    gl.setRenderTarget(null)
    gl.render(scene, camera1)

    gl.autoClear = true
    gl.clearDepth()

    // Note: I'm really confused about why this is in the original example.
    // swap
    // let temp = target1
    // target1 = target2
    // target2 = temp
  })

  const meshes = []

  // useEffect(() => {
  //   // console.log('meshes', meshes)
  // }, [meshes])

  return [...Array(amount).keys()].map((_, i) => {
    const mesh = createRef()
    meshes.push(mesh)
    return (
      <InstancedPlane
        key={`plane-${i}`}
        i={i}
        ref={mesh}
        camera1={camera1}
        camera2={camera2}
        target1={target1}
        target2={target2}
        progress={progress}
      />
    )
  })
}

DepthLines.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
  progress: PropTypes.number,
}

DepthLines.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
  progress: 2.5,
}

export default DepthLines
