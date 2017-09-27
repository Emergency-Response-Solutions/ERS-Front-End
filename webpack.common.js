const path = require('path');

module.exports = {
  entry:  [
            './src/components/App.jsx',
            './src/components/Dispatch/DispatchDetails.jsx',
            './src/index.js'
          ],
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
      }
    ]
  },
  node: {
   fs: "empty"
  }
};
