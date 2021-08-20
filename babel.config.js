/* eslint global-require: off, import/no-extraneous-dependencies: off */
const developmentEnvironments = ['development', 'test']

const developmentPlugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: {
        version: 3,
        proposals: true,
      },
      useESModules: true,
    },
  ],
]

const productionPlugins = [
  // require('babel-plugin-dev-expression'),
  // // babel-preset-react-optimize
  // require('@babel/plugin-transform-react-constant-elements'),
  // require('@babel/plugin-transform-react-inline-elements'),
  // require('babel-plugin-transform-react-remove-prop-types'),
]

module.exports = (api) => {
  const development = api.env(developmentEnvironments)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // 防止babel将任何模块类型都转译成CommonJS类型，导致tree-shaking失效问题
          modules: false,
        },
      ],
      require('@babel/preset-typescript'),
      [require('@babel/preset-react'), { development, runtime: 'automatic' }],
    ],
    plugins: [
      //   // Stage 0
      //   require('@babel/plugin-proposal-function-bind'),
      //   // Stage 1
      //   require('@babel/plugin-proposal-export-default-from'),
      //   require('@babel/plugin-proposal-logical-assignment-operators'),
      //   [require('@babel/plugin-proposal-optional-chaining')],
      //   [
      //     require('@babel/plugin-proposal-pipeline-operator'),
      //     { proposal: 'minimal' },
      //   ],
      //   [require('@babel/plugin-proposal-nullish-coalescing-operator')],
      //   require('@babel/plugin-proposal-do-expressions'),
      //   // Stage 2
      //   [require('@babel/plugin-proposal-decorators'), { legacy: true }],
      //   require('@babel/plugin-proposal-function-sent'),
      //   require('@babel/plugin-proposal-export-namespace-from'),
      //   require('@babel/plugin-proposal-numeric-separator'),
      //   require('@babel/plugin-proposal-throw-expressions'),
      //   // Stage 3
      //   require('@babel/plugin-syntax-dynamic-import'),
      //   require('@babel/plugin-syntax-import-meta'),
      //   [require('@babel/plugin-proposal-class-properties')],
      //   require('@babel/plugin-proposal-json-strings'),
      ...(development ? developmentPlugins : productionPlugins),
    ],
  }
}
