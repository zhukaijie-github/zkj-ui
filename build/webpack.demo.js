/*  webpack.prod.js */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.js');
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = 'development';

module.exports = merge(webpackBaseConfig, {
  devtool: 'source-map',
  mode: "development",
  entry: {
    main: path.resolve(__dirname, '../examples/main.js')  // 将src下的index.js 作为入口点
  },
  output: {
    path: path.resolve(__dirname, '../dist'), 
    publicPath: '/',
    filename: '[name].js',  // 改成自己的类库名
  },
  devServer: {
    hot: true,
    host: 'localhost',
    inline: true,
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './examples/index.html',
    }),
  ]
});
