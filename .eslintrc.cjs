module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'max-len': ["error", { "code": 150 }],
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'import/extensions': 'off',
    'no-prototype-builtins': 'off'
  },
};
