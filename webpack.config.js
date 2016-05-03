const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
};

module.exports = {
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
