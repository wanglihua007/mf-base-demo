const path = require('path')
const envConfig = require('./env')
const { NODE_ENV } = process.env
module.exports = {
  alias: {
    '@': path.join(__dirname, 'src'),
  },
  define: {
    GLOBAL_CONFIG: JSON.stringify(envConfig[NODE_ENV]),
    REACT_APP_ENV: JSON.stringify(NODE_ENV),
  },
  mf: {
    name: 'app2',
    filename: 'chip.js',
    exposes: {
      './Chip': path.join(__dirname, 'src/App'),
      './components': path.join(__dirname, 'src/components'),
    },
    shared: {
      react: {
        singleton: true,
        eager: true,
        requiredVersion: '17',
      },
      'react-dom': {
        singleton: true,
        eager: true,
        requiredVersion: '17',
      },
    },
  },
}
