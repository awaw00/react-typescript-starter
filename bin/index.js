"use strict";
const Koa = require("koa");
const convert = require("koa-convert");
const webpack = require("webpack");
const historyApiFallback = require("koa-connect-history-api-fallback");
const serve = require("koa-static");
const proxy = require("koa-proxy");
const config = require("config");
const webpack_dev_1 = require("./middleware/webpack-dev");
const webpack_hmr_1 = require("./middleware/webpack-hmr");
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
    app.use(webpack_dev_1.default(compiler, publicPath));
    app.use(webpack_hmr_1.default(compiler));
}
else {
    app.use(convert(serve(config.get('webpack.dist'))));
}
const port = config.get('server.port');
app.listen(port, () => {
    console.log(`Now server is listening at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map