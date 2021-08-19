const path = require('path')

const rootPath = path.join(__dirname, '..')
const srcPath = path.join(rootPath, 'src')
const distPath = path.join(rootPath, 'dist')
const publicPath = path.join(rootPath, 'public')

module.exports = {
  rootPath,
  srcPath,
  distPath,
  publicPath,
}
