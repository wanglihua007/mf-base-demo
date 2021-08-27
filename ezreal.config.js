const path = require('path')
const envConfig = require('./env')
const { NODE_ENV } = process.env
const deps = require('./package.json').dependencies

module.exports = (webpack) => ({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      GLOBAL_CONFIG: JSON.stringify(envConfig[NODE_ENV]),
      REACT_APP_ENV: JSON.stringify(NODE_ENV),
    }),
    new webpack.container.ModuleFederationPlugin({
      name: 'app2',
      filename: 'chip.js',
      exposes: {
        './Chip': path.join(__dirname, 'src/App'),
        './components': path.join(__dirname, 'src/components'),
      },
    }),
  ],
})
