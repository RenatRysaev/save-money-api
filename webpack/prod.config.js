const { resolve } = require('path')
const reduce = require('lodash/reduce')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { _moduleAliases: aliases } = require('../package.json')

const plugins = [new CleanWebpackPlugin(['build'])]

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

  resolve: {
    alias: reduce(
      aliases,
      (acc, alias, key) => ({
        ...acc,
        [key]: resolve(alias),
      }),
      {},
    ),
  },

  plugins,
}
