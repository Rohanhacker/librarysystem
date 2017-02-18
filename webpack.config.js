var path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/index.js',
  devtool: 'eval',
  output: {
    path: path.join(__dirname,'/public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true,
  proxy: {
    '/some/path': {
      target: 'https://localhost:8080',
      secure: false,
      bypass: function(req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          return '/index.html';
          }
        }
      }
    }
  },
  resolve: {
    extensions: ['.js','.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
