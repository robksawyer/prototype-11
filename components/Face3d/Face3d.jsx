/**
 * @file Face3d.js
 */
import React, { Suspense } from 'react'
import * as THREE from 'three'
import { useFrame, useResource } from 'react-three-fiber'
import PropTypes from 'prop-types'

import styles from './Face3d.module.css'

import FaceMesh from './FaceMesh'

const Face3d = (props) => {
  const { tagName: Tag, className, variant, children } = props

  const face = useResource()
  useFrame(({ clock }) => {
    // cam.current.updateMatrix
    // gl.autoClear = true

    face.current.position.z = THREE.MathUtils.lerp(
      face.current.position.z,
      face.current.position.z + Math.sin(clock.getElapsedTime()) * 0.15,
      0.01
    )

    // render scene into depthBuffer
    // scene.overrideMaterial = depthMaterial
    // gl.setRenderTarget(depthBuffer)

    // gl.render(scene, camera)
  })

  return (
    <Suspense fallback={null}>
      <group ref={face} scale={[0.045, 0.045, 0.045]}>
        <FaceMesh material={new THREE.MeshNormalMaterial()} />
      </group>
    </Suspense>
  )
}

Face3d.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

Face3d.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default Face3d
