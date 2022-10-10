import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import * as THREE from 'three';
import { useErrorBoundary } from 'use-error-boundary';

import { Canvas } from '@react-three/fiber';

import { Html, OrbitControls, Stats } from '@react-three/drei';

// const MainScene = dynamic(() => import('@/components/MainScene'), {
//   ssr: false,
// })
const TwoCameras = dynamic(() => import('@/components/TwoCameras'), {
  ssr: false,
});

const CursorCircle = dynamic(() => import('@/components/CursorCircle'), {
  ssr: false,
});
import HamburgerMenu from '@/components/HamburgerMenu';
// import WaveText from '@/components/WaveText'
import Face3d from '@/components/Face3d';
import StatsGroup from '@/components/StatsGroup';
import LightsBasic from '@/components/LightsBasic';

export default function Home() {
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();

  return (
    <div className={`align-center flex min-h-screen flex-col justify-center`}>
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HamburgerMenu />
      <main className={`flex flex-grow flex-col`}>
        <ErrorBoundary>
          <Canvas
            style={{
              width: '100vw',
              height: 'calc(100vh - 50px)',
              background: 'black',
            }}
          >
            {/* <MainScene /> */}
            <Face3d />
            <LightsBasic />
            <TwoCameras />
            <OrbitControls />
            {/* <gridHelper args={[30, 30, 30]} /> */}
            <StatsGroup />
          </Canvas>
        </ErrorBoundary>
      </main>

      <footer
        className={`h-50 align-center flex w-full items-center justify-center bg-black px-40 uppercase text-white`}
      >
        Powered by passion
      </footer>
      <CursorCircle />
    </div>
  );
}
