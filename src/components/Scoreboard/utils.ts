export type CssObject = Record<
  string,
  Record<'width' | 'height' | 'x' | 'y', number>
>
export const transformCssToObject = (css: string) => {
  return css
    .replace(/px/g, '')
    .replace(/\n(\n)*( )*(\n)*\n/g, '===')
    .split('===')
    .filter((item) => !!item)
    .reduce((res, item) => {
      const cssName = item.match(/\.(.*)\s+{/)?.[1]
      const width = item.match(/width:\s*(-?\d+)\s*;\s*/)?.[1]
      const height = item.match(/height:\s*(-?\d+)\s*;\s*/)?.[1]
      const position = item.match(
        /background:\s*url\('.*.png'\)\s*(-?\d+)\s*(-?\d+)\s*;\s*/
      )
      const x = position?.[1]
      const y = position?.[2]
      if (
        !cssName ||
        width === undefined ||
        height === undefined ||
        x === undefined ||
        y === undefined
      ) {
        return res
      }
      return {
        ...res,
        [cssName]: {
          width: +width,
          height: +height,
          x: +x,
          y: +y,
        },
      }
    }, {} as CssObject)
}
