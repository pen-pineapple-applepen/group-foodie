module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-typescript',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // project: ['tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {},
     },
  },
  rules: {
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '', 'x'] }],
    // 'import/extensions': 'never',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
};
