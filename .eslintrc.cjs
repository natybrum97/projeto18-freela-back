module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
  },
  settings: {
    'import/resolver': { node: {} },
  },
};
