import { useRef } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Modal, Divider, Zoom } from '@material-ui/core'
import clsx from 'clsx'
import { useSize } from 'ahooks'
import {
  ListScoreboardIconsResponse,
  ScoreboardIconType,
} from '@/services/scoreboardIcon'
import CloseImg from '@/assets/close.png'
import ProductImg from '@/assets/product.png'
import AddImg from '@/assets/add.png'
import SubImg from '@/assets/sub.png'
// import starMp3 from '@/assets/star.mp3'
import type { ImageSize } from '.'
import { CssObject } from './utils'
import { useDialog } from '@/hooks'
import ResetTipModal from './ResetTipModal'
import { useState } from 'react'

const DESIGN_WIDTH = 1920
const CURRENT_ICON_BOX_WIDTH = 40
const CURRENT_ICON_BOX_HEIGHT = 40
const CURRENT_ICON_WIDTH = 40
const CURRENT_ICON_HEIGHT = 40

interface StyleProps {
  px: number
  groupCount: number
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: StyleProps) => ({
      position: 'fixed',
      zIndex: 9999,
      boxSizing: 'border-box',
      top: '50%',
      left: '50%',
      marginTop: '-300px',
      marginLeft: props.groupCount <= 6 ? '-400px' : '-500px',
      width: props.groupCount <= 6 ? '800px' : '1000px',
      backgroundColor: '#5738E6',
      border: '12px solid #362D91',
      borderRadius: '24px',
      boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
    }),
    header: {
      height: '70px',
      display: 'flex',
      fontSize: '26px',
      color: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingLeft: '16px',
      paddingRight: '12px',
    },
    title: {
      flex: 1,
    },
    close: {
      cursor: 'pointer',
      width: '30px',
      height: '30px',
    },
    back: {
      cursor: 'pointer',
      position: 'absolute',
      left: '24px',
      padding: '6px 12px',
      borderRadius: '12px',
      fontSize: '16px',
      background: '#937bf6',
    },
    divider: (props: StyleProps) => ({
      paddingLeft: props.groupCount <= 6 ? '79px' : '79px',
      paddingRight: props.groupCount <= 6 ? '75px' : '70px',
    }),
    lessMain: {
      margin: '32px 72px 7px 79px',
    },
    mopxain: {
      marginTop: '32px',
      marginLeft: '52px',
      marginBottom: '95px',
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
    },
    lessItem: {
      display: 'flex',
      boxSizing: 'border-box',
      border: '3px solid #6748F5',
      borderRadius: '6px',
      width: '606px',
      height: '63px',
      marginBottom: '15px',
      alignItems: 'center',
      padding: '0 16px 0 0px',
    },
    moreItem: {
      display: 'flex',
      boxSizing: 'border-box',
      border: '3px solid #6748F5',
      borderRadius: '6px',
      width: '430px',
      height: '63px',
      marginBottom: '15px',
      marginRight: '31px',
      alignItems: 'center',
      padding: '0 16px 0 0px',
    },
    lessStar: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
    },
    moreStar: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      filter: 'brightness(1.1)',
    },
    lessStarItem: {
      display: 'block',
      margin: '0 7px',
    },
    moreStarItem: {
      display: 'block',
      margin: '0 5px',
    },
    lessBorder: {
      borderLeft: '3px solid #6748F5',
      height: '53px',
    },
    moreBorder: {
      borderLeft: '3px solid #6748F5',
      height: '45px',
    },
    lessIconBox: (props: StyleProps) => ({
      width: CURRENT_ICON_BOX_WIDTH,
      height: CURRENT_ICON_BOX_HEIGHT,
      cursor: 'pointer',
      margin: '0 15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    moreIconBox: (props: StyleProps) => ({
      width: CURRENT_ICON_BOX_WIDTH - 10,
      height: CURRENT_ICON_BOX_WIDTH - 10,
      cursor: 'pointer',
      margin: '0 10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    lessStarText: {
      fontSize: '26px',
      lineHeight: '26px',
      color: '#FFBD00',
      display: 'flex',
      alignItems: 'center',
    },
    moreStarText: {
      fontSize: '26px',
      lineHeight: '26px',
      color: '#FFBD00',
      display: 'flex',
      alignItems: 'center',
    },
    lessStarProduct: {
      display: 'block',
      margin: '0 8px',
    },
    moreStarProduct: {
      display: 'block',
      margin: '0 6px',
    },
    lessAction: {
      cursor: 'pointer',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 12px',
      borderRadius: '40px',
      width: '20px',
      height: '20px',
    },
    moreAction: {
      cursor: 'pointer',
      background: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 6px',
      borderRadius: '40px',
      width: '20px',
      height: '20px',
    },
  })
)

interface ShowScoreboardProps {
  open: boolean
  onRequestClose: () => void
  onRequestReset: () => void
  score: Record<string, number>
  addStarCount: (key: string) => void
  subStarCount: (key: string) => void
  loading: boolean
  iconData?: ListScoreboardIconsResponse
  selectType: ScoreboardIconType
  imageSize: ImageSize
  cssObject: CssObject
}

interface StarLineProps {
  type: 'less' | 'more'
  offset: number // 0 | 10
  px: number
  score: Record<string, number>
  iconData?: ListScoreboardIconsResponse
  selectType: ScoreboardIconType
  imageSize: ImageSize
  cssObject: CssObject
  subCount: (key: string) => void
  addCount: (key: string) => void
  showAnimation: string
}

function StarLine(props: StarLineProps) {
  const {
    offset,
    type,
    score,
    iconData,
    cssObject,
    selectType,
    imageSize,
    showAnimation,
  } = props
  const { width = 0 } = useSize(document.body)
  const px = width / DESIGN_WIDTH
  const groupCount = Object.keys(score).length
  const classes = useStyles({ px, groupCount })
  const icons = iconData?.catalogs?.find((item) => item.catalog === selectType)

  return (
    <div className={classes[type === 'less' ? 'lessMain' : 'mopxain']}>
      {Object.entries(score).map(([key, count]) => {
        const currentIndex = count
        const lastIndex = count - 1
        // const lastClassName = 'active move-from'
        // const currentClassName = 'move-to'
        const lastClassName = 'active'
        const currentClassName = showAnimation === key ? 'current' : 'active'

        if (!cssObject[key]) {
          return undefined
        }
        const currentWidth = CURRENT_ICON_WIDTH - offset
        const currentHeight = CURRENT_ICON_HEIGHT - offset
        const backgroundPositionX =
          ((cssObject[key].x * currentWidth) / cssObject[key].width) * px
        const backgroundPositionY =
          ((cssObject[key].y * currentWidth) / cssObject[key].width) * px
        const width = currentWidth * px
        const height =
          (currentWidth / cssObject[key].width) * cssObject[key].height * px
        const backgroundSize = `${
          (imageSize[selectType].width / cssObject[key].width) * 100
        }%`
        return (
          <div
            key={key}
            className={classes[type === 'more' ? 'moreItem' : 'lessItem']}
          >
            <div
              className={clsx(
                classes[type === 'more' ? 'moreIconBox' : 'lessIconBox']
              )}
            >
              <div
                style={{
                  width,
                  height,
                  transform: `scale(${currentHeight / height})`,
                  backgroundImage: `url(${icons?.imageUrl})`,
                  backgroundSize,
                  backgroundPositionX,
                  backgroundPositionY,
                }}
              />
            </div>
            <div
              className={classes[type === 'more' ? 'moreBorder' : 'lessBorder']}
            />
            <div
              className={`${
                classes[type === 'more' ? 'moreStar' : 'lessStar']
              } rating`}
            >
              {count <= 7 && (
                <ul>
                  {new Array(7)
                    .fill(0)
                    .map((_, index) => index + 1)
                    .map((item) => (
                      <li
                        className={`${
                          item === currentIndex && currentClassName
                        } ${item <= lastIndex && lastClassName}`}
                        style={{
                          width: `${type === 'more' ? 26 : 30}px`,
                          height: `${type === 'more' ? 26 : 30}px`,
                        }}
                      >
                        <svg
                          width={`${type === 'more' ? 26 : 30}px`}
                          height={`${type === 'more' ? 26 : 30}px`}
                        >
                          <use xlinkHref="#star"></use>
                        </svg>
                      </li>
                    ))}
                </ul>
              )}
              {count > 7 && (
                <ul>
                  <li
                    key={`current${count}`}
                    className={currentClassName}
                    style={{
                      width: `${type === 'more' ? 26 : 30}px`,
                      height: `${type === 'more' ? 26 : 30}px`,
                    }}
                  >
                    <svg
                      width={`${type === 'more' ? 26 : 30}px`}
                      height={`${type === 'more' ? 26 : 30}px`}
                    >
                      <use xlinkHref="#star"></use>
                    </svg>
                  </li>
                </ul>
              )}
              {count > 7 && (
                <div
                  className={
                    classes[type === 'more' ? 'moreStarText' : 'lessStarText']
                  }
                >
                  <img
                    src={ProductImg}
                    className={
                      classes[
                        type === 'more' ? 'moreStarProduct' : 'lessStarProduct'
                      ]
                    }
                    width={30 * px}
                    alt=""
                  />
                  <div>{count}</div>
                </div>
              )}
            </div>
            <div
              onClick={() => props.subCount(key)}
              className={classes[type === 'more' ? 'moreAction' : 'lessAction']}
            >
              <img src={SubImg} width={30} alt="" />
            </div>
            <div
              onClick={() => props.addCount(key)}
              className={classes[type === 'more' ? 'moreAction' : 'lessAction']}
            >
              <img src={AddImg} width={30} alt="" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function Show(props: ShowScoreboardProps) {
  const {
    open,
    onRequestClose,
    addStarCount,
    subStarCount,
    iconData,
    loading,
    score,
    selectType,
    onRequestReset,
    imageSize,
    cssObject,
  } = props
  const audioRef = useRef<HTMLAudioElement>(null)

  const { width = 0 } = useSize(document.body)
  const px = width / DESIGN_WIDTH
  const groupCount = Object.keys(score).length
  const classes = useStyles({ px, groupCount })
  const [showAnimation, setShowAnimatioin] = useState('')

  const playAudio = () => {
    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      audioRef.current.play()
    }
  }
  const addCount = (key: string) => {
    setShowAnimatioin(key)
    playAudio()
    addStarCount(key)
  }
  const subCount = (key: string) => {
    setShowAnimatioin(key)
    playAudio()
    subStarCount(key)
  }
  const icons = iconData?.catalogs?.find((item) => item.catalog === selectType)
  const resetTipModal = useDialog()
  const onClose = () => {
    resetTipModal.open()
    setShowAnimatioin('')
  }
  const onReset = () => {
    onRequestReset()
    resetTipModal.close()
    setShowAnimatioin('')
  }
  const onCloseModal = () => {
    onRequestClose()
    setShowAnimatioin('')
  }

  return (
    <Modal open={open} onClose={onCloseModal} disableBackdropClick>
      <Zoom in={open}>
        <div className={classes.root}>
          <div className={classes.header}>
            <div className={classes.back} onClick={() => onClose()}>
              重新分组
            </div>
            <div className={`${classes.title} web-font`}>计分板</div>
            <div className={classes.close} onClick={onCloseModal}>
              <img src={CloseImg} alt="close" width="100%" />
            </div>
          </div>
          {resetTipModal.isOpen && (
            <ResetTipModal onCancel={resetTipModal.close} onOk={onReset} />
          )}
          <div className={classes.divider}>
            <Divider />
          </div>
          {groupCount > 6 ? (
            <StarLine
              type="more"
              offset={10}
              px={px}
              score={score}
              iconData={iconData}
              selectType={selectType}
              imageSize={imageSize}
              cssObject={cssObject}
              subCount={subCount}
              addCount={addCount}
              showAnimation={showAnimation}
            />
          ) : (
            <StarLine
              type="less"
              offset={0}
              px={px}
              score={score}
              iconData={iconData}
              selectType={selectType}
              imageSize={imageSize}
              cssObject={cssObject}
              subCount={subCount}
              addCount={addCount}
              showAnimation={showAnimation}
            />
          )}

          <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
            <symbol
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 36 34"
              id="star"
            >
              <path
                fill="currentColor"
                d="M19.6859343,0.861782958 L24.8136328,8.05088572 C25.0669318,8.40601432 25.4299179,8.6717536 25.8489524,8.80883508 L34.592052,11.6690221 C35.6704701,12.021812 36.2532905,13.1657829 35.8938178,14.2241526 C35.8056709,14.4836775 35.6647294,14.7229267 35.4795411,14.9273903 L29.901129,21.0864353 C29.5299163,21.4962859 29.3444371,22.0366367 29.3872912,22.5833831 L30.1116131,31.8245163 C30.1987981,32.9368499 29.3506698,33.9079379 28.2172657,33.993502 C27.9437428,34.0141511 27.6687736,33.9809301 27.4085205,33.8957918 L18.6506147,31.0307612 C18.2281197,30.8925477 17.7713439,30.8925477 17.3488489,31.0307612 L8.59094317,33.8957918 C7.51252508,34.2485817 6.34688429,33.6765963 5.98741159,32.6182265 C5.90066055,32.3628116 5.86681029,32.0929542 5.88785051,31.8245163 L6.61217242,22.5833831 C6.65502653,22.0366367 6.46954737,21.4962859 6.09833466,21.0864353 L0.519922484,14.9273903 C-0.235294755,14.0935658 -0.158766688,12.8167745 0.690852706,12.0755971 C0.899189467,11.8938516 1.14297067,11.7555303 1.40741159,11.6690221 L10.1505113,8.80883508 C10.5695458,8.6717536 10.9325319,8.40601432 11.1858308,8.05088572 L16.3135293,0.861782958 C16.9654141,-0.0521682813 18.2488096,-0.274439442 19.1800736,0.365326425 C19.3769294,0.500563797 19.5481352,0.668586713 19.6859343,0.861782958 Z"
              ></path>
            </symbol>
            <path
              className="shadow"
              d="M18.7022469,29.7633426 L29.1611722,33.6861584 C28.8859085,33.8576358 28.5650147,33.9672494 28.2172657,33.993502 C27.9437428,34.0141511 27.6687736,33.9809301 27.4085205,33.8957918 L18.6506147,31.0307612 C18.2281197,30.8925477 17.7713439,30.8925477 17.3488489,31.0307612 L8.59094317,33.8957918 C7.98083887,34.0953792 7.34281791,33.9989813 6.83864817,33.6859784 L17.2977531,29.7633426 C17.7505234,29.5935537 18.2494766,29.5935537 18.7022469,29.7633426 Z"
            ></path>
          </svg>

          {/* <audio ref={audioRef} src={starMp3} preload="auto" /> */}
        </div>
      </Zoom>
    </Modal>
  )
}

export default Show
