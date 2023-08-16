/**
 * @type {import('eslint').Linter.Config<import('eslint/rules/index').ESLintRules>}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    camelcase: 'off',
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-else-return': 'off',
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'class-methods-use-this': ['off'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'never',
      exports: 'never',
      functions: 'never',
    }],
    'default-case': ['off'],
    indent: ['error', 2, {SwitchCase: 1}],
    'import/extensions': ['off'],
    'max-len': ['error', {code: 180}],
    'no-restricted-syntax': ['off'],
    'object-curly-spacing': ['off'],
    'padded-blocks': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'prefer-object-spread': ['off'],
    'linebreak-style': [
      'error',
      process.platform === 'win32' ? 'windows' : 'unix',
    ],
  },
};
