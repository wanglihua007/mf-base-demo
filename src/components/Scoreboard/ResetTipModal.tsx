import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Divider } from '@material-ui/core'
import clsx from 'clsx'
import { IconFontSymbol } from '@/components'
const useStyles = makeStyles({
  root: {
    position: 'fixed',
    boxSizing: 'border-box',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
    backgroundColor: '#fff',
    borderRadius: '24px',
    paddingLeft: '24px',
    paddingRight: '24px',
    paddingBottom: '36px',
  },
  hidden: {
    display: 'none',
  },
  header: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: '18px',
    lineHeight: '25px',
  },
  close: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  colorButton: {},
  divider: {},
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  mainTextItem: {
    fontSize: '16px',
    marginTop: '60px',
  },
  mainActionItem: {
    marginTop: '48px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '288px',
  },
  flex: {
    flex: 1,
  },
  button: {
    width: '135px',
    height: '38px',
    borderRadius: '38px',
    border: '0',
    cursor: 'pointer',
    fontSize: '18px',
  },
  oKButton: {
    background: '#382BD1',
    color: '#fff',
  },
  cancelButton: {
    background: '##dedede',
    color: '#000',
  },
})
interface ResetTipModalProps {
  onOk?: () => void
  onCancel: () => void
  okText?: string
  cancelText?: string
  title?: string
}

const ResetTipModal: FC<ResetTipModalProps> = (props) => {
  const {
    onCancel,
    onOk,
    okText = '确定',
    cancelText = '取消',
    title = '提示:',
  } = props
  const classes = useStyles()
  return (
    <Modal open onClose={onCancel} disableBackdropClick hideBackdrop>
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.title}>{title}</div>
          <div className={classes.close} onClick={onCancel}>
            <IconFontSymbol
              name="icon-close"
              width="25px"
              height="25px"
              color="#D8D8D8"
            />
          </div>
        </div>
        <div className={classes.divider}>
          <Divider />
        </div>
        <div className={classes.main}>
          <div className={classes.mainTextItem}>
            将自动清空现有分组和奖励记录
          </div>
          <div className={classes.mainActionItem}>
            <button
              onClick={onCancel}
              className={clsx(classes.button, classes.cancelButton)}
            >
              {cancelText}
            </button>

            <button
              onClick={onOk}
              className={clsx(classes.button, classes.oKButton)}
            >
              {okText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ResetTipModal
