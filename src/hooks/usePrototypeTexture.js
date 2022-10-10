/**
 * usePrototypeTexture
 * @see https://github.com/gsimone/ombra/blob/main/src/usePrototypeTexture.ts
 */
// import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

const getUrl = (color = 'blue1') =>
  `https://rawcdn.githack.com/robksawyer/gridbox-prototype-materials/9bca2cea43ca4f488af79c26c81a77523c503b4c/prototype_512x512_${color}.png`

// type Color =
//   | 'blue1'
//   | 'blue2'
//   | 'blue3'
//   | 'brown'
//   | 'cyan'
//   | 'green1'
//   | 'green2'
//   | 'grey1'
//   | 'grey2'
//   | 'grey3'
//   | 'grey4'
//   | 'orange'
//   | 'purple'
//   | 'red'
//   | 'white'
//   | 'yellow'

export function usePrototypeTexture(color = 'blue1') {
  return useTexture(getUrl(color))
}
