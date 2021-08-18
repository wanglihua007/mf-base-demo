import { useEffect, useRef } from 'react'

function useIsMounted() {
  const isMount = useRef(false)
  useEffect(() => {
    isMount.current = true
    return () => {
      isMount.current = false
    }
  }, [])
  return () => isMount.current
}

export default useIsMounted
