import { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Modal, Divider, Zoom, Button } from '@material-ui/core'
import clsx from 'clsx'
import AnimalImg from '@/assets/scoreboard/animal.png'
import DigitalImg from '@/assets/scoreboard/digital.png'
import LetterImg from '@/assets/scoreboard/letter.png'
import { useSize } from 'ahooks'
import {
  ListScoreboardIconsResponse,
  ScoreboardIconType,
} from '@/services/scoreboardIcon'
import CloseImg from '@/assets/close.png'
import { message } from '@/components'
import { ImageSize } from '.'
import { CssObject } from './utils'

const DESIGN_WIDTH = 1920
const CURRENT_ICON_BOX_WIDTH = 66
const CURRENT_ICON_BOX_HEIGHT = 66
const CURRENT_ICON_WIDTH = 50
const CURRENT_ICON_HEIGHT = 50

interface StyleProps {
  px: number
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      zIndex: 9999,
      boxSizing: 'border-box',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '824px',
      height: '591px',
      backgroundColor: '#5738E6',
      border: '12px solid #362D91',
      borderRadius: '24px',
      boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
      marginTop: '-300px',
      marginLeft: '-412px',
    },
    header: {
      height: '84px',
      display: 'flex',
      position: 'relative',
      fontSize: '28px',
      color: '#fff',
      lineHeight: '40px',
      justifyContent: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
    },
    title: {
      marginTop: '25px',
    },
    close: {
      position: 'absolute',
      right: '33px',
      top: '35px',
      cursor: 'pointer',
      width: '30px',
      height: '30px',
    },
    divider: {
      padding: '0 89px',
    },
    count: {
      color: '#fff',
      fontSize: '18px',
      marginTop: '8px',
    },
    body: {
      marginTop: '12px',
      marginLeft: '47px',
      display: 'flex',
    },
    type: {
      width: '56px',
      paddingTop: '25px',
    },
    typeItem: {
      height: '65px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      marginTop: '16px',
    },
    typeItemIcon: {
      padding: '6px',
      display: 'block',
    },
    selectedTypeItem: {
      borderTopLeftRadius: '24px',
      borderBottomLeftRadius: '24px',
      background: '#392CC2',
    },
    main: {
      width: '673px',
      height: '349px',
      background: '#392CC2',
      borderRadius: '24px',
      display: 'flex',
      flexWrap: 'wrap',
      padding: '17px 24px',
      overflowY: 'auto',
      alignContent: 'flex-start',
      boxSizing: 'border-box',
    },
    selectTypeIcon: {
      backgroundColor: '#DEE6FF!important',
    },
    createRoot: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '16px',
    },
    createButton: {
      borderRadius: '24px',
      borderWidth: '0',
      color: '#fff',
      fontSize: '22px',
      background: '#FFCD2F',
      width: '142px',
      height: '48px',
      cursor: 'pointer',
      boxSizing: 'border-box',
    },
    iconBox: (props: StyleProps) => ({
      padding: 0,
      width: CURRENT_ICON_BOX_WIDTH,
      height: CURRENT_ICON_BOX_HEIGHT,
      cursor: 'pointer',
      borderRadius: '8px',
      margin: '10px 5px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
  })
)

const MAX_SELECT_COUNT = 8
interface CreateScoreboardProps {
  open: boolean
  onRequestClose: () => void
  onCreated: (type: ScoreboardIconType, groups: Set<string>) => void
  loading: boolean
  iconData?: ListScoreboardIconsResponse
  imageSize: ImageSize
  cssObject: CssObject
}

function Create(props: CreateScoreboardProps) {
  const {
    open,
    onRequestClose,
    onCreated,
    loading,
    iconData,
    imageSize,
    cssObject,
  } = props
  const [selectType, setSelectType] = useState<ScoreboardIconType>('animal')
  const [selectedIcon, setSelectedIcon] = useState<Set<string>>(new Set())
  const changeSelectType = (type: ScoreboardIconType) => () => {
    if (type !== selectType) {
      const preSelectedIcon = new Set(selectedIcon)
      preSelectedIcon.clear()
      setSelectedIcon(preSelectedIcon)
      setSelectType(type)
    }
  }
  const { width = 0 } = useSize(document.body)
  const px = width / DESIGN_WIDTH
  const classes = useStyles({ px })
  const icons = iconData?.catalogs?.find((item) => item.catalog === selectType)
  const onClickIcon = (icon: string) => {
    const preSelectedIcon = new Set(selectedIcon)
    if (preSelectedIcon.has(icon)) {
      preSelectedIcon.delete(icon)
    } else {
      if (preSelectedIcon.size >= MAX_SELECT_COUNT) {
        message.warning(`最多选择${MAX_SELECT_COUNT}个标志`)
        return
      }
      preSelectedIcon.add(icon)
    }
    setSelectedIcon(preSelectedIcon)
  }
  const create = () => {
    if (selectedIcon.size <= 0) {
      message.warning('请先选择计分板分组头像！')
      return
    }
    onCreated(selectType, selectedIcon)
  }
  return (
    <Modal open={open} onClose={onRequestClose} disableBackdropClick>
      <Zoom in={open}>
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.title}>请选择计分板分组头像</div>
            <div className={classes.close} onClick={() => onRequestClose()}>
              <img src={CloseImg} alt="close" width="100%" />
            </div>
          </div>
          <div className={classes.divider}>
            <Divider />
            <div className={classes.count}>已选数量：{selectedIcon.size}</div>
          </div>
          <div className={classes.body}>
            <div className={classes.type}>
              <div
                onClick={changeSelectType('animal')}
                className={clsx(
                  classes.typeItem,
                  selectType === 'animal' && classes.selectedTypeItem
                )}
              >
                <img
                  src={AnimalImg}
                  alt="animal"
                  width="100%"
                  className={classes.typeItemIcon}
                />
              </div>
              <div
                onClick={changeSelectType('number')}
                className={clsx(
                  classes.typeItem,
                  selectType === 'number' && classes.selectedTypeItem
                )}
              >
                <img
                  src={DigitalImg}
                  alt="number"
                  width="100%"
                  className={classes.typeItemIcon}
                />
              </div>
              <div
                onClick={changeSelectType('alphabet')}
                className={clsx(
                  classes.typeItem,
                  selectType === 'alphabet' && classes.selectedTypeItem
                )}
              >
                <img
                  src={LetterImg}
                  alt="letter"
                  width="100%"
                  className={classes.typeItemIcon}
                />
              </div>
            </div>
            <div className={classes.main}>
              {icons?.images.map((item) => {
                if (!cssObject[item]) {
                  return undefined
                }
                const backgroundPositionX =
                  (cssObject[item].x * CURRENT_ICON_WIDTH) /
                  cssObject[item].width
                const backgroundPositionY =
                  (cssObject[item].y * CURRENT_ICON_WIDTH) /
                  cssObject[item].width
                const width = CURRENT_ICON_WIDTH
                const height =
                  (CURRENT_ICON_WIDTH / cssObject[item].width) *
                  cssObject[item].height
                const backgroundSize = `${
                  (imageSize[selectType].width / cssObject[item].width) * 100
                }%`
                return (
                  <Button
                    key={item}
                    className={clsx(
                      classes.iconBox,
                      selectedIcon.has(item) && classes.selectTypeIcon
                    )}
                  >
                    <div
                      key={item}
                      onClick={() => onClickIcon(item)}
                      style={{
                        width,
                        height,
                        transform: `scale(${CURRENT_ICON_HEIGHT / height})`,
                        backgroundImage: `url(${icons.imageUrl})`,
                        backgroundSize,
                        backgroundPositionX,
                        backgroundPositionY,
                      }}
                    />
                  </Button>
                )
              })}
            </div>
          </div>
          <div className={classes.createRoot}>
            <button onClick={() => create()} className={classes.createButton}>
              选好了
            </button>
          </div>
        </div>
      </Zoom>
    </Modal>
  )
}

export default Create
