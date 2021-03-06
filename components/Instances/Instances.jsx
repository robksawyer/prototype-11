/**
 * @file Instances.js
 *
 * useImperativeHandle info
 * @see https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue
 */
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useImperativeHandle,
} from 'react'

// import styles from './Instances.module.css'

let uuid = 0
export let context = React.createContext()

/**
 * Instances
 * @param {*} param0
 */
function Instances({ children }) {
  const ref = useRef()
  const [ticker, set] = useState(0)
  const instances = useRef({})
  const api = useMemo(
    () => ({ ref, update: () => set((state) => state + 1), instances }),
    []
  )
  const count = Object.keys(instances.current).length

  useEffect(() => {
    Object.values(instances.current).forEach((matrix, index) =>
      ref.current.setMatrixAt(index, matrix)
    )
    ref.current.instanceMatrix.needsUpdate = true
  }, [count, ticker])

  return (
    <context.Provider value={api}>
      <instancedMesh key={count} ref={ref} args={[null, null, count || 1]}>
        {children}
      </instancedMesh>
    </context.Provider>
  )
}

/**
 * Instance
 */
const Instance = React.forwardRef(({ children, ...props }, forwardRef) => {
  const [id] = useState(() => uuid++)
  const group = useRef()
  const { ref, update, instances } = React.useContext(context)

  useEffect(() => {
    group.current.updateMatrixWorld()
    instances.current[id] = group.current.matrixWorld
    update()
    return () => delete instances.current[id]
  }, [])

  useImperativeHandle(forwardRef, () => ({
    position: group.current.position,
    scale: group.current.scale,
    rotation: group.current.rotation,
    update: () => {
      // todo: optimize into a static object lookup
      Object.keys(instances.current).forEach((key, index) => {
        if (String(key) === String(id)) {
          group.current.updateMatrixWorld()
          ref.current.setMatrixAt(index, group.current.matrixWorld)
        }
      })
      ref.current.instanceMatrix.needsUpdate = true
    },
  }))

  return (
    <group ref={group} {...props}>
      {children}
    </group>
  )
})
Instance.displayName = 'Instance'

export { Instance, Instances }
