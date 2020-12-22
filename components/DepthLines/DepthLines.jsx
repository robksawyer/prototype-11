/**
 * @file DepthLines.js
 */
import * as React from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { useResource, useFrame } from 'react-three-fiber'

import { useFBO } from '../../hooks/useFBO'

import styles from './DepthLines.module.css'

// Shader stack
import './shaders/defaultShaderMaterial'

const DepthLines = (props) => {
  const { tagName: Tag, className, variant, children, camera1, camera2 } = props
  const mesh = useResource()

  const depthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.BasicDepthPacking,
  })

  console.log('depthMaterial', depthMaterial)

  let format = THREE.DepthFormat
  let type = THREE.UnsignedShortType

  const target1 = useFBO({
    settings: {
      format: THREE.RGBFormat,
      // minFilter: THREE.NearestFilter,
      // magFilter: THREE.NearestFilter,
      // generateMipmaps: false,
      stencilBuffer: false,
      depthBuffer: true,
      type: THREE.UnsignedShortType,
      depthTexture: new THREE.DepthTexture(),
    },
  })
  target1.depthTexture.type = type
  target1.depthTexture.format = format

  const target2 = useFBO({
    settings: {
      format: THREE.RGBFormat,
      // minFilter: THREE.NearestFilter,
      // magFilter: THREE.NearestFilter,
      // generateMipmaps: false,
      stencilBuffer: false,
      depthBuffer: true,
      type: THREE.UnsignedShortType,
      depthTexture: new THREE.DepthTexture(),
    },
  })
  target2.depthTexture.type = type
  target2.depthTexture.format = format

  console.log('target1', target1)
  console.log('target2', target2)

  useFrame(({ gl, scene, clock }) => {
    gl.autoClear = true
    scene.overrideMaterial = depthMaterial
    gl.setRenderTarget(target1)

    if (mesh && mesh.material) {
      // render post FX
      // mesh.material.uniforms.cameraNear.value = camera.near
      // mesh.material.uniforms.cameraFar.value = camera.far
      mesh.material.uniforms.time.value = clock.getElapsedTime()
      mesh.material.uniforms.ttt.value = target1.depthTexture
    }

    gl.render(scene, camera2)

    // console.log('mesh.current.material', mesh.current.material)
    // mesh.current.material.uniforms.tDiffuse.value = depthBuffer.texture

    // Clear the render target and the overrided scene material
    scene.overrideMaterial = null
    gl.setRenderTarget(null)
    gl.render(scene, camera1)

    gl.autoClear = false
    gl.clearDepth()
  })

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

  return (
    <mesh ref={mesh}>
      <planeGeometry attach="geometry" args={[2, 2, 100, 100]} />
      <defaultShaderMaterial
        attach="material"
        side={THREE.DoubleSide}
        cameraNear={camera1.near}
        cameraFar={camera1.far}
        progress={0.6}
        // depthInfo={depthBuffer.texture}
        // texture1={depthBuffer.texture}
        // transparent
        depthWrite={true}
        // resolution={new THREE.Vector4()}
        // uvRate1={new THREE.Vector2(1, 1)}
      />
    </mesh>
  )
}

DepthLines.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

DepthLines.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default DepthLines
