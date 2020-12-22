/**
 * @file shaders/DefaultShaderMaterial/index.js
 * Basic shader setup and material example.
 *
 * Usage:
 *
 *    import { extend } from 'react-three-fiber
 *    import { DefaultShaderMaterial } from './shaders/DefaultShaderMaterial'
 *
 *    ... later in the React component
 *    <mesh>
 *      ...
 *      <defaultShaderMaterial time={0} ... />
 *    </mesh>
 *
 */

/**
 * The idea is as follows:
 * - Render the main scene to a WebGLRenderTarget. This target will contain RGB and Depth data that
 *   can be accessed via their .texture and .depthTexture attributes, accordingly.
 *
 * - Take these 2 textures, and apply them to a plane with custom shaders.
 *
 * - In the plane's custom shaders, you can access the texture data to perform whatever calculations
 *   you want to play with colors and depth.
 *
 * - Render the second scene (that contains only the plane) to canvas.
 */
import * as THREE from 'three'
import { extend } from 'react-three-fiber'
import { shaderMaterial } from '@react-three/drei'

import vertex from './default.vert'
import fragment from './default.frag'

/**
 * DefaultShaderMaterial
 * @param {*} uniforms
 */
const DefaultShaderMaterial = shaderMaterial(
  {
    // NOTE: This throws an error.
    // defines: {
    //   '#extension GL_OES_standard_derivatives': 'enable',
    // },
    time: 0,
    texture1: null,
    depthInfo: null,
    cameraNear: 1.0,
    ttt: null,
    cameraFar: 2000.0,
    progress: 0.0,
    mouse: new THREE.Vector2(),
    resolution: new THREE.Vector4(),
    // texture1: new THREE.TextureLoader(
    //   '/3d/textures/checkerboard.jpg',
    //   (texture) => {
    //     console.log('texture', texture)
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    //   }
    // ),
  },
  // vertex shader
  vertex,
  // fragment shader
  fragment,
  (material) => {
    console.log('material', material)
    material.side = THREE.DoubleSide
    // material.wireframe = false
    // material.vertexColors = true
    // material.flatShading = true
    // material.needsUpdate = true
    // material.minFilter = THREE.LinearMipMapLinearFilter
    // material.magFilter = THREE.LinearMipMapLinearFilter

    // material.defines = {
    //   '#extension GL_OES_standard_derivatives': 'enable',
    // }
    // material.extensions = {
    //   derivatives: true,
    // }
  }
)

extend({ DefaultShaderMaterial })
