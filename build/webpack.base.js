"use strict";
const path = require("path");
const webpack = require("webpack");
const pkg = require("../package.json");
const {VueLoaderPlugin} = require("vue-loader");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
            less: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: "less-loader",
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          postLoaders: {
            html: "babel-loader?sourceMap",
          },
          sourceMap: true,
        },
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              sourceMap: true,
            },
            
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: "style-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        loaders: [
          {
            loader: "style-loader",
           
          },
          {
            loader: "css-loader",
            
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.scss$/,
        loaders: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=8192",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": resolve("src"),
    },
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env.VERSION": `'${pkg.version}'`,
    }),
    new VueLoaderPlugin(),
  ],
};
