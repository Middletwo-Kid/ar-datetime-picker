const path = require('path');
const { merge } = require('webpack-merge');
const commConfig = require('./webpack.base.config');

const buildConfig = {
  mode: 'production',
  entry: {
    'datetime-picker': './src/components/DatetimePicker/index.js',
    overlay: './src/components/Overlay/index.js',
    popup: './src/components/Popup/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

module.exports = merge(commConfig, buildConfig);
