import { queryString } from '@/utils'
import { useLocalStorageState, useRequest } from 'ahooks'
import Create from './Create'
import Show from './Show'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import {
  listScoreboardIcons,
  ScoreboardIconType,
} from '@/services/scoreboardIcon'
import { useState } from 'react'
import { CssObject, transformCssToObject } from './utils'
const useStyles = makeStyles({
  root: {},
  hidden: {
    display: 'none',
  },
})
interface ScoreboardProps {
  open: boolean
  onRequestClose: () => void
}
export type ImageSize = Record<
  ScoreboardIconType,
  { width: number; height: number }
>
export const DEFAULT_ICON_SIZES: ImageSize = {
  animal: {
    width: 0,
    height: 0,
  },
  alphabet: {
    width: 0,
    height: 0,
  },
  number: {
    width: 0,
    height: 0,
  },
}
function Scoreboard(props: ScoreboardProps) {
  const { open, onRequestClose } = props
  const { bookingId } = queryString<{ bookingId?: string }>()
  const [score, setScore] = useLocalStorageState<Record<string, number>>(
    `${window.location.host}/classroom/common/scoreboard/score/${bookingId}`,
    {}
  )
  const [currentType, setCurrentType] =
    useLocalStorageState<ScoreboardIconType>(
      `${window.location.host}/classroom/common/scoreboard/currentType/${bookingId}`,
      'animal'
    )
  const classes = useStyles()
  const onCreated = (type: ScoreboardIconType, groups: Set<string>) => {
    setCurrentType(type)
    setScore(
      [...groups].reduce(
        (res, item) => ({ ...res, [item]: 0 }),
        {} as Record<string, number>
      )
    )
  }
  const addStarCount = (key: string) => {
    setScore((prev = {}) => ({ ...prev, [key]: prev[key] + 1 }))
  }
  const subStarCount = (key: string) => {
    if (score && score[key] > 0) {
      setScore((prev = {}) => ({ ...prev, [key]: prev[key] - 1 }))
    }
  }
  const [imageSize, setImageSize] = useState<ImageSize>(DEFAULT_ICON_SIZES)
  const [cssObj, setCssObj] = useState<CssObject>({})
  const listScoreboardIconsRequest = useRequest(listScoreboardIcons, {
    onSuccess: (res) => {
      fetch(`${res.cssUrl}?t=${new Date()}`)
        .then((res) => res.text())
        .then((res) => {
          setCssObj(transformCssToObject(res))
        })
      res.catalogs.forEach((item) => {
        const img = new Image()
        img.onload = function () {
          setImageSize((prev) => ({
            ...prev,
            [item.catalog]: { width: img.width, height: img.height },
          }))
        }
        img.src = item.imageUrl
      })
    },
  })
  const onReset = () => {
    setScore({})
  }
  return (
    <div className={clsx(classes.root, !open && classes.hidden)}>
      {score && Object.keys(score).length > 0 ? (
        <div>
          <Show
            open={open}
            onRequestClose={onRequestClose}
            addStarCount={addStarCount}
            subStarCount={subStarCount}
            score={score}
            iconData={listScoreboardIconsRequest.data}
            loading={listScoreboardIconsRequest.loading}
            onRequestReset={onReset}
            selectType={currentType || 'animal'}
            imageSize={imageSize}
            cssObject={cssObj}
          />
        </div>
      ) : (
        <Create
          open={open}
          onRequestClose={onRequestClose}
          onCreated={onCreated}
          iconData={listScoreboardIconsRequest.data}
          loading={listScoreboardIconsRequest.loading}
          imageSize={imageSize}
          cssObject={cssObj}
        />
      )}
    </div>
  )
}

export default Scoreboard
