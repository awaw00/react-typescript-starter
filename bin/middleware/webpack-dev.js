"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const WebpackDevMiddleware = require("webpack-dev-middleware");
const apply_express_middleware_1 = require("../libs/apply-express-middleware");
function default_1(compiler, publicPath) {
    const middleware = WebpackDevMiddleware(compiler, {
        publicPath,
        hot: true,
        quiet: false,
        noInfo: false,
        stats: {
            chunks: false,
            chunkModules: false,
            colors: true
        }
    });
    return function koaWebpackDevMiddleware(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let hasNext = yield apply_express_middleware_1.default(middleware, ctx.req, {
                end: (content) => (ctx.body = content),
                setHeader: function () {
                    ctx.set.apply(ctx, arguments);
                }
            });
            if (hasNext) {
                yield next();
            }
        });
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=webpack-dev.js.map