module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    jest: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-empty-pattern': 0,
    'no-extra-boolean-cast': 0,
    'no-unused-vars': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/jsx-no-target-blank': 0,
    'react-hooks/exhaustive-deps': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/no-anonymous-default-export': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/consistent-type-assertions': 'error',
    'react/react-in-jsx-scope': 0,
    'react/jsx-uses-react': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js',
      },
    },
  },
  globals: {
    REACT_APP_ENV: true,
    GLOBAL_CONFIG: true,
  },
}
