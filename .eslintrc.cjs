module.exports = {
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'import/no-unresolved': 'error',
    'import/order': 'warn',
    'import/no-named-as-default-member': 'off',
    'import/newline-after-import': ['error'],
    'lines-between-class-members': ['error', 'always'],
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': { node: {} },
  },
};
