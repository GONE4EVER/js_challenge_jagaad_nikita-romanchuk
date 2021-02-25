const production = process.env.NODE_ENV === 'production';

const allowedToReassignParams = [
  'result', // reduce accumulator value
  'state', // Vuex mutations
];


module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    '@vue/airbnb',
    'plugin:vue/essential',
    'plugin:vue/recommended',
  ],
  parserOptions: {
    ecmaVersion: 8,
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: [ 'jest' ],
  rules: {
    'array-bracket-spacing': [
      'error',
      'always',
    ],
    'arrow-parens': [
      'error',
      'as-needed',
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'import/extensions': [
      'error',
      'always',
      {
        // vue: 'never',
        js: 'never',
      },
    ],
    'import/newline-after-import': [
      2,
      { count: 2 },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: './**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'builtin',
          'external',
        ],
      },
    ],
    indent: [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'newline-after-var': [
      'error',
      'always',
    ],
    'newline-before-return': [ 'error' ],
    'no-console': production
      ? 'warn'
      : 'off',
    'no-debugger': production
      ? 'warn'
      : 'off',
    'no-multiple-empty-lines': [
      'error',
      { max: 2 },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: allowedToReassignParams,
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
      node: {
        paths: [
          'src',
        ],
        extensions: [
          '.vue',
          '.js',
        ],
      },
    },
  },
};
