var path = require('path')

module.exports = {
  context: __dirname,
  entry: './js/App.js',
  output: {
    path: path.join(__dirname,'/public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer: {
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js','.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  }
}
