var webpack = require('webpack');

var path = require('path');
var OPTIONS_DIR = path.join(__dirname, 'options/');
var POPUP_DIR = path.join(__dirname, 'popup/');

var optionsConfig = {
  name: 'options',
  output: {
    path: OPTIONS_DIR,
    filename: 'options.bundle.js'
  },
  entry: path.join(OPTIONS_DIR, 'options.index.js'),
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map'
};

var popupConfig = {
  name: 'popup',
  output: {
    path: POPUP_DIR,
    filename: 'popup.bundle.js'
  },
  entry: path.join(POPUP_DIR, 'popup.index.js'),
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('require("source-map-support").install();', {
      raw: true,
      entryOnly: false
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map'
};

module.exports = [
  optionsConfig,
  popupConfig
];
