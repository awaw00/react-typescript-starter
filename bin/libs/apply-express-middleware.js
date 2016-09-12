"use strict";
// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
function applyExpressMiddleware(fn, req, res) {
    const originalEnd = res.end;
    return new Promise((resolve) => {
        res.end = function () {
            originalEnd.apply(this, arguments);
            resolve(false);
        };
        fn(req, res, function () {
            resolve(true);
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
exports.default = applyExpressMiddleware;
//# sourceMappingURL=apply-express-middleware.js.map