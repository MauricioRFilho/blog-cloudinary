module.exports = {
  extends: [
    './base.js',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}
