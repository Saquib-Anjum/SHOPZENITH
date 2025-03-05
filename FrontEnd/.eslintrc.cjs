module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier'
    ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      ecmaFeatures: { jsx: true }
    },
    settings: {
      react: { version: 'detect' }
    },
    plugins: ['react', 'react-hooks'],
    rules: {
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0
    }
  };
  