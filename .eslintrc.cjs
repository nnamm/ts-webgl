module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['tsconfig.json'],
    sourceType: 'module',
  },
  rules: {},
  ignorePatterns: ['vite.config.ts'],
};
