/**
 * @file Face3d.js
 */
import React, { Suspense } from 'react';
import * as THREE from 'three';
import PropTypes from 'prop-types';

import styles from './Face3d.module.css';

import FaceMesh from './FaceMesh';
import Facefull from './Facefull';

const Face3d = ({}) => {
  return (
    <Suspense fallback={null}>
      <FaceMesh
        position={[0, 0, -0.35]}
        scale={[0.75, 0.75, 0.75]}
        material={new THREE.MeshLambertMaterial({ color: 0xff0ff00 })}
      />
      {/* <Facefull
          material={new THREE.MeshLambertMaterial({ color: 0xff0ff00 })}
        /> */}
    </Suspense>
  );
};

Face3d.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default Face3d;
