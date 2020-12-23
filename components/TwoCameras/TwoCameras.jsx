/**
 * @file TwoCameras.js
 */
import * as React from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

import { useTweaks } from 'use-tweaks'

import { useResource, useFrame } from 'react-three-fiber'

import { useHelper, PerspectiveCamera } from '@react-three/drei'

import styles from './TwoCameras.module.css'

import DepthLines from '../DepthLines'

const TwoCameras = (props) => {
  // const { tagName: Tag, className, variant, children } = props

  const {
    camera1Position,
    camera1ZDepth,
    camera2Position,
    camera2ZDepth,
    progress,
  } = useTweaks('Camera Positions', {
    progress: {
      value: 1.0,
      min: -10.0,
      max: 10.0,
    },
    camera1Position: {
      value: { x: 0, y: 0 },
    },
    camera1ZDepth: {
      value: 1,
      min: -10,
      max: 10,
    },
    camera2Position: {
      value: { x: 0, y: 0 },
    },
    camera2ZDepth: {
      value: 2,
      min: -10,
      max: 10,
    },
  })

  const camera1 = useResource()
  const camera2 = useResource()

  useHelper(camera1, THREE.CameraHelper)
  useHelper(camera2, THREE.CameraHelper)

  // useFrame(({ clock }) => {
  //   // Move the cameras back and forth
  //   camera1.current.position.z = THREE.MathUtils.lerp(
  //     camera1.current.position.z,
  //     camera1.current.position.z + Math.sin(clock.getElapsedTime()) * 1.15,
  //     0.01
  //   )
  //   camera2.current.position.z = THREE.MathUtils.lerp(
  //     camera2.current.position.z,
  //     camera2.current.position.z + Math.sin(clock.getElapsedTime() / 2) * 1.15,
  //     0.01
  //   )
  // })

  return (
    <>
      <PerspectiveCamera
        ref={camera1}
        position-x={camera1Position.x}
        position-y={camera1Position.y}
        position-z={camera1ZDepth}
        args={[70, window.innerWidth / window.innerHeight, 0.2, 5]}
      />
      <PerspectiveCamera
        ref={camera2}
        position-x={camera2Position.x}
        position-y={camera2Position.y}
        position-z={camera2ZDepth}
        args={[70, window.innerWidth / window.innerHeight, 2.1, 3]}
      />

      {camera1.current && camera2.current && (
        <DepthLines
          progress={progress}
          camera1={camera1.current}
          camera2={camera2.current}
        />
      )}
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
