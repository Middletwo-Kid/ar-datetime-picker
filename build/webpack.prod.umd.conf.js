const path = require('path');
const { merge } = require('webpack-merge');
const commConfig = require('./webpack.base.config');

const buildConfig = {
  mode: 'production',
  entry: './src/components/index.js',
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

module.exports = merge(commConfig, buildConfig);
