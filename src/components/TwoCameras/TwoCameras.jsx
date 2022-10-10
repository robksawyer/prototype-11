/**
 * @file TwoCameras.js
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

import { useControls } from 'leva';

import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

import styles from './TwoCameras.module.css';

import DepthLines from '../DepthLines';

const TwoCameras = props => {
  const camera1 = React.useRef();
  const camera2 = React.useRef();

  const { progress } = useControls('Camera Positions', {
    progress: {
      value: 0.54,
      min: -10.0,
      max: 10.0,
    },
  });

  // This makes sure that size-related calculations are proper
  // Every call to useThree will return this camera instead of the default camera
  const set = useThree(state => state.set);
  useEffect(() => void set({ camera: camera1.current }), []);
  useFrame(() => camera1.current.updateMatrixWorld());

  return (
    <>
      <PerspectiveCamera
        ref={camera1}
        position-x={0}
        position-y={0}
        position-z={2}
        rotation-y={90}
        args={[70, window.innerWidth / window.innerHeight, 0.01, 5]}
      />
      <PerspectiveCamera
        ref={camera2}
        position-x={0}
        position-y={0}
        position-z={0}
        args={[70, window.innerWidth / window.innerHeight, 0.001, 300]}
      />
      {camera1.current && camera2.current && (
        <DepthLines
          progress={progress}
          camera1={camera1.current}
          camera2={camera2.current}
        />
      )}
    </>
  );
};

TwoCameras.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default TwoCameras;
