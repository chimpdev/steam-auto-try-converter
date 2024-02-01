module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'always'],
    'linebreak-style': 'off',
    'arrow-parens': 'off',
  },
};
