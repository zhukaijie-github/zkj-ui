const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { terser } = require('rollup-plugin-terser');
// const { eslint } = require('rollup-plugin-eslint');
const vue = require('rollup-plugin-vue');

module.exports = {
  input: './src/index.js',
  plugins: [
    vue({ css: false }),
    resolve(), // 这样 Rollup 能找到 `ms`
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    // eslint(),
    babel({ runtimeHelpers: true, exclude: 'node_modules/**' }),
    terser()
  ]
};
