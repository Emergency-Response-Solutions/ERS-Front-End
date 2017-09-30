const path = require('path');

module.exports = {
  entry: [
    './src/components/App.jsx',
    './src/components/ERS_DispatchDetails.jsx',
    './src/components/Logo.jsx',
    './src/components/Topic.jsx',
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
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
        query: {
          classIdPrefix: '[name]-[hash:8]__',

          propsMap: {
            fillRule: 'fill-rule'
          },
          xmlnsTest: /^xmlns.*$/
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};
