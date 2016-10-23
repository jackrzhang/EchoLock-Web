var webpack = require('webpack');

var path = require('path');
var OPTIONS_DIR = path.join(__dirname, 'options/');
var POPUP_DIR = path.join(__dirname, 'popup/');
var BACKGROUND_DIR = path.join(__dirname, 'background/');

var optionsConfig = {
  name: 'options',
  output: {
    path: path.join(OPTIONS_DIR, 'js/'),
    filename: 'options.bundle.js'
  },
  entry: path.join(OPTIONS_DIR, 'js/', 'options.index.js'),
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map'
};

var popupConfig = {
  name: 'popup',
  output: {
    path: path.join(POPUP_DIR, 'js/'),
    filename: 'popup.bundle.js'
  },
  entry: path.join(POPUP_DIR, 'js/', 'popup.index.js'),
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map'
};

var backgroundConfig = {
  name: 'background',
  output: {
    path: path.join(BACKGROUND_DIR),
    filename: 'background.bundle.js'
  },
  entry: path.join(BACKGROUND_DIR, 'background.index.js'),
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map'
};

module.exports = [
  optionsConfig,
  popupConfig,
  backgroundConfig
];
