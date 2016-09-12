var path = require('path');
var defer = require('config/defer').deferConfig;

var publicPath = function (cfg) {
  return 'http://' + cfg.server.host + ':' + cfg.server.port + '/';
};

module.exports = {
  globals: {
    __DEV__: true
  },
  proxy: {
    host: "http://www.google.com",
    match: /^\/api\//i
  },
  webpack: {
    devtool: 'source-map',
    publicPath: '/'
  }
};
