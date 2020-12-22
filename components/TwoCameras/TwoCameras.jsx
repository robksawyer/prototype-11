/**
 * @file TwoCameras.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

import { useResource, useFrame } from 'react-three-fiber'

import { useHelper, PerspectiveCamera } from '@react-three/drei'

import styles from './TwoCameras.module.css'

import DepthLines from '../DepthLines'

const TwoCameras = (props) => {
  // const { tagName: Tag, className, variant, children } = props

  const camera1 = useResource()
  const camera2 = useResource()

  useHelper(camera1, THREE.CameraHelper)
  useHelper(camera2, THREE.CameraHelper)

  useFrame(({ clock }) => {
    // Move the cameras back and forth
    camera1.current.position.z = THREE.MathUtils.lerp(
      camera1.current.position.z,
      camera1.current.position.z + Math.sin(clock.getElapsedTime()) * 1.15,
      0.01
    )
    camera2.current.position.z = THREE.MathUtils.lerp(
      camera2.current.position.z,
      camera2.current.position.z + Math.sin(clock.getElapsedTime() / 2) * 1.15,
      0.01
    )
  })

  return (
    <>
      <PerspectiveCamera
        ref={camera1}
        position={[0, -0.5, 1]}
        args={[70, window.innerWidth / window.innerHeight, 0.01, 5]}
      />
      <PerspectiveCamera
        ref={camera2}
        position={[0, 0, 2]}
        args={[70, window.innerWidth / window.innerHeight, 2.1, 3]}
      />

      <DepthLines camera={camera1.current} />
    </>
  )
}

TwoCameras.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

TwoCameras.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default TwoCameras
