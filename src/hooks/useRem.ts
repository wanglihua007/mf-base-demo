import { COMMON } from '@/constants/layout'
import { useSize } from 'ahooks'

const useRem = () => {
  const { width = 0 } = useSize(document.body)
  const rem = width / COMMON.PX.DESIGN_WIDTH
  return rem
}

export default useRem
