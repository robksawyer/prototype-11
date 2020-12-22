import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import * as THREE from 'three'
import { useErrorBoundary } from 'use-error-boundary'

import { Canvas, useThree, useResource, useFrame } from 'react-three-fiber'

import { Html, OrbitControls, Stats } from '@react-three/drei'

import styles from '../styles/Home.module.css'

// const MainScene = dynamic(() => import('../components/MainScene'), {
//   ssr: false,
// })
const TwoCameras = dynamic(() => import('../components/TwoCameras'), {
  ssr: false,
})

const CursorCircle = dynamic(() => import('../components/CursorCircle'), {
  ssr: false,
})
import HamburgerMenu from '../components/HamburgerMenu'
// import WaveText from '../components/WaveText'
import Face3d from '../components/Face3d'
import StatsGroup from '../components/StatsGroup'

export default function Home() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary()

  return (
    <div
      className={`${styles.container} min-h-screen flex flex-col justify-center align-center`}
    >
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main className={`${styles.main} flex flex-grow flex-col`}>
        <ErrorBoundary>
          <Canvas
            pixelRatio={(process.browser && window.devicePixelRatio) || 1}
            shadowMap
            style={{
              width: '100vw',
              height: 'calc(100vh - 50px)',
              background: 'floralwhite',
            }}
            onCreated={({ gl }) => {
              gl.physicallyCorrectLights = true
              // gl.toneMapping = THREE.ACESFilmicToneMapping
              // gl.outputEncoding = THREE.sRGBEncoding
            }}
          >
            {/* <MainScene /> */}
            <TwoCameras />
            <Face3d />
            {/* <WaveText className="absolute bottom-0 flex items-center justify-center w-screen h-screen pointer-events-none select-none" /> */}
            <OrbitControls />
            <gridHelper args={[30, 30, 30]} />
            <StatsGroup />
          </Canvas>
        </ErrorBoundary>
      </main>

      <footer
        className={`${styles.footer} w-full h-50 bg-black text-white px-40 flex align-center items-center justify-center uppercase`}
      >
        Powered by passion
      </footer>
      <CursorCircle />
    </div>
  )
}
