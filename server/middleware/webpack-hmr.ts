import  * as WebpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from '../libs/apply-express-middleware';

export default function (compiler, opts?) {
  const middleware = WebpackHotMiddleware(compiler, opts);
  return async function koaWebpackHMR (ctx, next) {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);

    if (hasNext && next) {
      await next();
    }
  };
}
