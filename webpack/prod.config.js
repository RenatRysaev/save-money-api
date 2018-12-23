const { resolve } = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const plugins = [
  new CleanWebpackPlugin(['build']),
]

module.exports = {
  mode: 'production',

  target: 'node',

  entry: resolve('src/app'),

  output: {
    filename: 'bundle.js',
    path: resolve('build'),
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
      },
    ],
  },

  externals: [nodeExternals()],

  plugins,
}
