module.exports = {
  root: true,
  extends: [
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  plugins: [
    'vue',
    'prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-undef': 'error',
    'no-unused-vars': 'warn',
    'no-else-return': 'warn'
  },
  globals: {
    "M": true,
    "flvjs": true,
    "WxLogin": true,
    "_": true
  }
}
