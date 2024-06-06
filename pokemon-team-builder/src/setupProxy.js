const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/prod',
        createProxyMiddleware({
            target: 'https://ulxy6s8cub.execute-api.us-east-1.amazonaws.com',
            changeOrigin: true,
        })
    );
};
