var path = require('path');

module.exports = {
  globals: {
    __DEV__: false
  },
  server: {
    host: 'localhost',
    port: 8081,
    static: path.resolve(__dirname, '../dist/static')
  },
  webpack: {
    dist: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  }
}