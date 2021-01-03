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
    face.current.position.z = THREE.MathUtils.lerp(
      face.current.position.z,
      face.current.position.z + Math.sin(clock.getElapsedTime()) * 0.15,
      0.01
    )
    face.current.rotation.y = THREE.MathUtils.lerp(
      face.current.rotation.y,
      face.current.rotation.y + Math.sin(clock.getElapsedTime()) * 0.25,
      0.01
    )
  })

  return (
    <Suspense fallback={null}>
      <group ref={face} position={[0, 0, -0.35]} scale={[0.75, 0.75, 0.75]}>
        <FaceMesh
          material={new THREE.MeshLambertMaterial({ color: 0xff0ff00 })}
        />
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
