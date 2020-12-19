/**
 * useFBO.js
 * Frame Buffer Objects
 * @see https://github.com/gsimone/ombra/blob/main/src/useFBO.ts
 * @see https://github.com/spite/THREE.FBOHelper
 */
import * as THREE from 'three'
import { useMemo } from 'react'

// type useFBOProps = {
//   settings: THREE.WebGLRenderTargetOptions;
//   width?: number;
//   height?: number;
// };

export function useFBO({
  settings,
  width = window.innerWidth * window.devicePixelRatio,
  height = window.innerHeight * window.devicePixelRatio,
}) {
  return useMemo(() => {
    const target = new THREE.WebGLRenderTarget(width, height, settings)
    return target
  }, [settings])
}
