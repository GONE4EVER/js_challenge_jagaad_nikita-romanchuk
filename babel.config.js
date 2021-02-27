module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: [ './src' ],
        alias: {
          '/': './',
          '@/': './',
        },
        stripExtensions: [
          '.js',
          '.vue',
        ],
      },
    ],
  ],
};
