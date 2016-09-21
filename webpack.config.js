'use strict';
let path = require('path');

let BUILD_DIR = path.resolve(__dirname, 'client/public');
let APP_DIR = path.resolve(__dirname, 'client/src');

let config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }

};

module.exports = config;
