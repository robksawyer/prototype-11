/**
 * @file TwoCameras.js
 */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as THREE from 'three'

import { useTweaks } from 'use-tweaks'

import { useResource, useFrame, useThree } from 'react-three-fiber'

import { useHelper, PerspectiveCamera } from '@react-three/drei'

import styles from './TwoCameras.module.css'

import DepthLines from '../DepthLines'

const TwoCameras = (props) => {
  // const { tagName: Tag, className, variant, children } = props

  const { progress } = useTweaks('Camera Positions', {
    progress: {
      value: 2.4,
      min: -10.0,
      max: 10.0,
    },
  })

  const camera1 = useResource()
  const camera2 = useResource()

  const { setDefaultCamera } = useThree()
  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera
  useEffect(() => void setDefaultCamera(camera1.current), [])
  // useHelper(camera1, THREE.CameraHelper)
  // useHelper(camera2, THREE.CameraHelper)

  return (
    <>
      <PerspectiveCamera
        ref={camera1}
        position-x={0}
        position-y={0}
        position-z={1}
        args={[70, window.innerWidth / window.innerHeight, 0.01, 5]}
      />
      <PerspectiveCamera
        ref={camera2}
        position-x={0}
        position-y={0}
        position-z={0}
        args={[70, window.innerWidth / window.innerHeight, 0.01, 3]}
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
