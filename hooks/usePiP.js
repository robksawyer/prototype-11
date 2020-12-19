/**
 * @file usePiP.js
 * @see https://codesandbox.io/s/usepip-37cd9?file=/src/App.tsx:0-1582
 */
// Usage:
// function Simple() {
//   const ref = React.useRef
//   const [props, styles] = usePiP(ref)
//   // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
//   return (
//     <>
//       <h1>Click and drag</h1>
//       <animated.div ref={ref} {...props()} style={{ ...styles }}>
//         <img
//           src="/giphy.gif"
//           alt="rick roll"
//           style={{ pointerEvents: 'none' }}
//         />
//       </animated.div>
//     </>
//   )
// }

// export default Simple

// import React, { RefObject } from 'react'
import { useSpring } from 'react-spring'
import { useDrag } from 'react-use-gesture'
import './styles.css'

export function usePiP(ref) {
  const [styles, set] = useSpring(() => ({
    x: 10,
    y: 10,
  }))
  const bind = useDrag(
    ({ down, last, movement: [x, y], metaKey, ...rest }) => {
      let defaultX = 10
      let defaultY = 10
      if (last && ref.current) {
        const rect = ref.current.getBoundingClientRect()
        if (rect.x + rect.width / 2 > window.innerWidth / 2) {
          defaultX = window.innerWidth - 10 - rect.width
        }
        if (rect.y + rect.height / 2 > window.innerHeight / 2) {
          defaultY = window.innerHeight - 10 - rect.height
        }
      }
      set({
        x: down || metaKey ? x : defaultX,
        y: down || metaKey ? y : defaultY,
        immediate: down,
      })
    },
    { initial: () => [styles.x.get(), styles.y.get()] }
  )
  return [bind, { ...styles, position: 'fixed', left: 0, top: 0 }]
}
