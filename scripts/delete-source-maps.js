import path from 'path'
import rimraf from 'rimraf'
import webpackPaths from '../configs/webpack.paths'

export default function deleteSourceMaps() {
  rimraf.sync(path.join(webpackPaths.distPath, '*.js.map'))
}
