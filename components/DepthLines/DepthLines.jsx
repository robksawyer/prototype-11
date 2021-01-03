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

// const InstancedPlane = (props) => {
//   const { camera1, target2, i, progress, position } = props

//   const pBuffG = useUpdate(
//     (geometry) => {
//       const { i } = geometry.userData
//       let y = []
//       let len = geometry.attributes.position.array.length
//       for (let j = 0; j < len / 3; j++) {
//         y.push(i / 100)
//       }
//       geometry.setAttribute(
//         'y',
//         new THREE.BufferAttribute(new Float32Array(y), 1)
//       )

//       geometry.attributes.y.needsUpdate = true
//     },
//     [] // execute only if these properties change
//   )

//   const ref = useUpdate((mesh) => {
//     console.log(`mesh ${i}`, mesh)
//     // mesh.material.uniforms.depthInfo.value = target2.depthTexture
//   }, [])

//   return (
//     <instancedMesh ref={ref} position={position}>
//       <planeBufferGeometry
//         ref={pBuffG}
//         userData={{ i }}
//         attach="geometry"
//         args={[2, 0.005, 300, 1]}
//       />
//       <defaultShaderMaterial
//         attach="material"
//         side={THREE.DoubleSide}
//         cameraNear={camera1.near}
//         cameraFar={camera1.far}
//         progress={progress}
//         depthInfo={target2.depthTexture}
//         depthWrite={true}
//       />
//     </instancedMesh>
//   )
// }

// const LineInstance = ({ position = [0, 0, 0] }) => {
//   const instance = useUpdate((instance) => {
//     // console.log('instance', instance)
//   })

//   return <Instance ref={instance} position={position} />
// }

// eslint-disable-next-line react/display-name
const InstancedPlane = React.forwardRef(
  ({ i, camera1, progress, target1, target2, ...props }, ref) => {
    // const dummy = new THREE.Object3D()

    const geometry = useUpdate(
      (geometry) => {
        console.log('geometry', geometry)
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

        geometry.attributes.y.needsUpdate = true
      },
      [] // execute only if these properties change
    )

    const material = useUpdate(
      (material) => {
        // console.log('material', material)
      },
      [] // execute only if these properties change
    )

    useFrame(({ clock }) => {
      // render post FX
      material.current.uniforms.time.value = clock.getElapsedTime()
      material.current.uniforms.depthInfo.value = target1.depthTexture
      material.current.needsUpdate = true
    })

    return (
      <mesh position={[0, (i - 50) / 50, 0]}>
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

    // return (
    //   <Instances>
    //     <planeBufferGeometry attach="geometry" args={[2, 0.005, 300, 1]} />
    //     <defaultShaderMaterial
    //       attach="material"
    //       ref={material}
    //       side={THREE.DoubleSide}
    //       cameraNear={camera1.near}
    //       cameraFar={camera1.far}
    //       progress={progress}
    //       depthInfo={target1.depthTexture}
    //       depthWrite={true}
    //     />
    //     {[...Array(amount).keys()].map((_, i) => {
    //       return (
    //         <LineInstance
    //           key={`iLine-${i}`}
    //           target={target1}
    //           position={[0, (i - 50) / 50, 0]}
    //         />
    //       )
    //     })}
    //   </Instances>
    // )
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
      // type: THREE.UnsignedShortType,
      depthTexture: new THREE.DepthTexture(),
    },
  })

  target2.texture.format = THREE.RGBFormat
  target2.texture.minFilter = THREE.NearestFilter
  target2.texture.magFilter = THREE.NearestFilter
  target2.texture.generateMipmaps = false

  target2.depthTexture.type = type
  target2.depthTexture.format = format

  // console.log('target1', target1)
  // console.log('target2', target2)

  useFrame(({ gl, scene, clock }) => {
    gl.autoClear = true
    // scene.overrideMaterial = depthMaterial
    gl.setRenderTarget(target1)

    // if (mesh && mesh.material) {
    //   // render post FX
    //   // mesh.material.uniforms.cameraNear.value = camera.near
    //   // mesh.material.uniforms.cameraFar.value = camera.far
    //   mesh.material.uniforms.time.value = clock.getElapsedTime()
    //   mesh.material.uniforms.depthInfo.value = target2.depthTexture
    // }

    gl.render(scene, camera2)

    // Clear the render target and the overrided scene material
    scene.overrideMaterial = null
    gl.setRenderTarget(null)
    gl.render(scene, camera1)

    gl.autoClear = false
    gl.clearDepth()

    // Note: I'm really confused about why this is in the original example.
    // swap
    // let temp = target1
    // target1 = target2
    // target2 = temp
  })

  // Original example
  // for (let i = 0; i <= 100; i++) {
  //   this.geometry = new THREE.PlaneBufferGeometry(2, 0.005, 300, 1);

  //   let y = [];
  //   let len = this.geometry.attributes.position.array.length;
  //   for (let j = 0; j < len/3; j++) {
  //     y.push(i/100)
  //   }
  //   this.geometry.setAttribute('y', new THREE.BufferAttribute(new Float32Array(y),1))

  //   this.plane = new THREE.Mesh(this.geometry, this.material);
  //   this.plane.position.y = (i - 50)/50
  //   this.scene.add(this.plane);
  // }

  return [...Array(amount).keys()].map((_, i) => {
    return (
      <InstancedPlane
        key={`plane-${i}`}
        i={i}
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
  progress: 1.0,
}

export default DepthLines
