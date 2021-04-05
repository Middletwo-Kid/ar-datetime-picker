// eslint-disable-next-line import/no-extraneous-dependencies
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const resolve = (dir) => path.resolve(__dirname, '..', dir);
module.exports = {
  stats: 'errors-only',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      src: resolve('src'),
    },
    extensions: ['.vue', '.js'],
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /.(s|c)ss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader'],
      },

    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
