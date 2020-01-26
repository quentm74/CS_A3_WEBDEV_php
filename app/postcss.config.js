module.exports = {
  modules: true,
  plugins: {
    'postcss-modules': {
      globalModulePaths: [
        'src/style/emoji.css',
      ]
    }
  }
};
