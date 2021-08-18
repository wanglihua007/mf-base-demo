import { RectangleSize } from '@/shared/typings'
import { useState } from 'react'

interface SlideInfo {
  slideCount: number
  currentSlide: number
  currentSlideStepCount: number
  currentStep: number
}
const initSlideInfo: SlideInfo = {
  slideCount: 0,
  currentSlide: 0,
  currentSlideStepCount: 0,
  currentStep: 0,
}

function usePPTState() {
  const [slideInfo, setSlideInfo] = useState(initSlideInfo)
  const [loaded, setLoaded] = useState(false)
  const [view, setView] = useState<RectangleSize>({ height: 0, width: 0 })
  const onLoaded = (info?: {
    slideInfo: Partial<SlideInfo>
    pptView: RectangleSize
  }) => {
    setLoaded(true)
    if (info) {
      setSlideInfo((prev) => ({
        ...prev,
        ...info.slideInfo,
      }))
      setView(info.pptView)
    }
  }
  const onSlideInfoChanged = (info: Partial<SlideInfo>) => {
    setSlideInfo((prev) => ({
      ...prev,
      ...info,
    }))
  }
  return { loaded, slideInfo, onLoaded, onSlideInfoChanged, view }
}

export default usePPTState
