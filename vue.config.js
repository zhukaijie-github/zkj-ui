const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 9000,
    hot: true
  },
  configureWebpack: config => {
    config.entry.app = './examples/main.js';
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('src', resolve('src'))
      .set('@', resolve('examples'))
      .set('@packages', resolve('packages'));
    config.module
      .rule('js')
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options;
      });
  }
};
