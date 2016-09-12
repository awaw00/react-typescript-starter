import * as WebpackDevMiddleware from 'webpack-dev-middleware';
import applyExpressMiddleware from '../libs/apply-express-middleware';

export default function (compiler, publicPath) {

  const middleware = WebpackDevMiddleware(compiler, {
    publicPath,
    hot: true,
    quiet: false,
    noInfo: false,
    stats: {
      chunks : false,
      chunkModules : false,
      colors : true
    }
  });

  return async function koaWebpackDevMiddleware (ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end: (content) => (ctx.body = content),
      setHeader: function () {
        ctx.set.apply(ctx, arguments);
      }
    });

    if (hasNext) {
      await next();
    }
  };
}
