import { useMemo, useState } from 'react'

function useStack<T>(init: T[] = []) {
  const [stack, setStack] = useState<T[]>(init)
  const top = useMemo(() => stack[0], [stack])
  const reset = () => {
    setStack(init)
  }
  const pop = () => {
    if (stack.length) {
      const [_, current, ...history] = stack
      setStack([current, ...history].filter((item) => !!item))
    }
  }
  const push = (item: T) => {
    setStack((prev) => [item, ...prev])
  }
  return { stack, reset, push, pop, top }
}

export default useStack
