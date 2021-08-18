const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const configs = require('./config/env')

const rootPath = __dirname
const paths = {
  root: rootPath,
  src: path.join(rootPath, 'src'),
  dist: path.join(rootPath, 'dist'),
  public: path.join(rootPath, 'public'),
}
const { dependencies: packageJsonDeps } = require('./package.json')
const { REACT_APP_ENV, ANALYZER, PORT: port = 1212 } = process.env

const commonRules = [
  {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  },
  {
    test: /\.global\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
  {
    test: /^((?!\.global).)*\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
          sourceMap: true,
          importLoaders: 1,
        },
      },
    ],
  },
  // WOFF Font
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff',
      },
    },
  },
  // WOFF2 Font
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/font-woff',
      },
    },
  },
  // OTF Font
  {
    test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'font/otf',
      },
    },
  },
  // TTF Font
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'application/octet-stream',
      },
    },
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: 'file-loader',
  },
  // SVG Font
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        mimetype: 'image/svg+xml',
      },
    },
  },
  // Common Image Formats
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
    use: 'url-loader',
  },
]

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  entry: path.resolve(paths.src, 'index'),
  output: {
    path: paths.dist,
  },
  module: {
    rules: [...commonRules],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      GLOBAL_CONFIG: JSON.stringify(configs[REACT_APP_ENV]),
      REACT_APP_ENV: JSON.stringify(REACT_APP_ENV),
    }),
    new HtmlWebpackPlugin({
      filename: path.join('index.html'),
      template: path.join(paths.public, 'index.html'),
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      env: process.env.NODE_ENV,
      isDevelopment: process.env.NODE_ENV !== 'production',
    }),

    new webpack.container.ModuleFederationPlugin({
      name: 'app2',
      filename: 'chip.js',
      exposes: {
        './Chip': './src/App',
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
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  devServer: {
    port,
    open: true,
  },
}
