const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 过滤plugin
function FilterCreatePlugin() {}
FilterCreatePlugin.prototype.apply = function(compiler) {
  compiler.hooks.shouldEmit.tap('FilterCreatePlugin', (compilation) => {
    let newAssets = {};
    // 理论会生成css/xxx/xx.js的css文件，此处去除
    const regExtJs = /.*\.js$/;
    for (k in compilation.assets) {
      if (!regExtJs.test(k)) {
        newAssets[k] = compilation.assets[k];
      }
    }
    compilation.assets = newAssets;
    return true;
  });
};
const stylePath = path.resolve(__dirname, './src');

let css = fs.readdirSync(stylePath);
let reg = /\.scss$/;

css = css.filter((item) => reg.test(item) === true);

const entries = css.reduce((_entries, filePath) => {
  const key = filePath.split('.')[0];
  _entries[key] = stylePath + '/' + filePath;
  return _entries;
}, {});

module.exports = {
  entry: {
    ...entries,
  },
  mode: 'production',
  output: {
    publicPath: './',
    path: path.resolve(__dirname, '../lib/theme-chalk'),
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new FilterCreatePlugin(),
  ],
};
