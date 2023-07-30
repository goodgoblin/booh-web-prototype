const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/auth/**',
        createProxyMiddleware({
            target: 'http://localhost:5000'
        })
    );
    app.use('/booh/**',
        createProxyMiddleware({
            target: 'http://localhost:5000'
        })
    );
};
