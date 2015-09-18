var webpack = require('webpack');

module.exports = {
  entry: [
    './app/components/app/main-body.js'
  ],
  output: {
    path: './app',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
};
