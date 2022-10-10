/**
 * @file LightsBasic.js
 */
import React, { useRef } from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'
import { useHelper } from '@react-three/drei'

import styles from './LightsBasic.module.css'

const ENABLE_HELPERS = 0

const LightsBasic = (props) => {
  const { tagName: Tag, className, variant, children } = props
  const group = useRef()

  const spotLight = useRef()
  const pointLight = useRef()

  if (ENABLE_HELPERS) {
    useHelper(spotLight, THREE.SpotLightHelper, 'teal')
    useHelper(pointLight, THREE.PointLightHelper, 0.5, 'hotpink')
  }

  return (
    <>
      <pointLight position={[-1, 0, 1]} color="lightblue" intensity={1.5} />
      <group ref={group}>
        <pointLight
          ref={pointLight}
          color="yellow"
          position={[4, 4, -3]}
          intensity={1}
        />
      </group>
      <spotLight
        castShadow
        position={[1, 1, 2]}
        ref={spotLight}
        angle={0.5}
        distance={100}
      />
    </>
  )
}

LightsBasic.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
}

LightsBasic.defaultProps = {
  tagName: 'div',
  className: '',
  variant: 'default',
  children: '',
}

export default LightsBasic
