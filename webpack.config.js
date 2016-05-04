const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

process.env.BABEL_ENV = TARGET;

var common = {
  entry: PATHS.src,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.src
      }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Selene',
      template: 'src/index.html',
      inject: false
    })
  ]
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
};

if (TARGET === 'build') {
  module.exports = merge(common, {
    // Add production config code
  })
};
