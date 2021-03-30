module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [],
  plugins: ['import', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
