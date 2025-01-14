module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-unused-vars': ['off'],
    'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
    '@typescript-eslint/no-unused-vars': ['off'],
  },
};
