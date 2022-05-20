module.exports = (options, app) => {
  return async function testMiddleware(ctx, next) {
    console.log("运行中间件")
    await next();
  };
};

// config/config.default.js
// add middleware robot
exports.middleware = ['test'];
