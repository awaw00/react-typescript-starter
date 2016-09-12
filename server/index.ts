import * as Koa from 'koa';
import * as convert from 'koa-convert';
import * as webpack from 'webpack';
import * as historyApiFallback from 'koa-connect-history-api-fallback';
import * as serve from 'koa-static';
import * as proxy from 'koa-proxy';
import * as config from 'config';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';

const app = new Koa();
// Enable koa-proxy if it has been enabled in the config.
if (config.has('proxy')) {
  const proxyOption = config.get('proxy');
  app.use(convert(proxy(proxyOption)));
}

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.util.getEnv('NODE_ENV') === 'development') {
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  // Enable webpack-dev and webpack-hot middleware
  const publicPath = config.get('webpack.publicPath');

  app.use(webpackDevMiddleware(compiler, publicPath));
  app.use(webpackHMRMiddleware(compiler));
} else {
  app.use(convert(serve(config.get('webpack.dist'))));
}

const port = config.get('server.port');
app.listen(port, () => {
  console.log(`Now server is listening at http://localhost:${port}/`);
});
