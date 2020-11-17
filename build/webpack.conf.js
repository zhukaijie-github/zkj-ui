const path = require('path');
const fs = require('fs');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');
function resolve(str) {
  return path.resolve(__dirname, `../${str}`);
}


function generateEntrys(src){
  const entrys = fs.readdirSync(src);
  return entrys.reduce((entry, filePath)=>{
    entry[filePath] = path.resolve(src,filePath, './index');
    return entry;
  },{})
}

const config = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue',
  },
  alias: {
    vue$: 'vue/dist/vue.esm.js',
    '@': resolve('examples'),
    '~': resolve('packages'),
  },
  jsexclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
};

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    ...generateEntrys(resolve('packages'))
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'ELEMENT',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
  },
  externals: {
    vue: config.vue,
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
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'eslint-loader',
        },
        enforce: 'pre',
        options: {
            formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
    ],
  },
  plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()],
};
