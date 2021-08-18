import React, { FC } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { CSSProperties } from 'react'

interface StyleProps {
  color: string
  width: number | string
  height: number | string
}
const useStyles = makeStyles({
  root: (props: StyleProps) => ({
    width: props.width,
    height: props.height,
  }),
})

interface IconFontSvgProps {
  width?: number | string
  height?: number | string
  className?: string
  color?: string
  style?: CSSProperties
  name: string
}

const IconFontSymbol: FC<IconFontSvgProps> = (props) => {
  const {
    name,
    width = '16rem',
    height = '16rem',
    color = '#000',
    className,
    style,
  } = props
  const classes = useStyles({ width, height, color })
  return (
    <svg
      className={clsx('icon', classes.root, className)}
      aria-hidden="true"
      style={style}
      fill={color}
    >
      <use xlinkHref={`#${name}`} />
    </svg>
  )
}

export default IconFontSymbol
