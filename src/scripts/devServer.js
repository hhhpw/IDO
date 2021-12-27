function proxyRule(key, targetUrl) {
  return {
    target: targetUrl,
    changeOrigin: true,
    secure: false,
    ws: true,
    port: 8866,
    pathRewrite: {
      [`^${key}`]: targetUrl,
    },
  };
}

function devServer() {
  return {
    compress: true,
    open: true,
    hot: true, // 热更新
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        ...proxyRule("/api", process.env.VUE_APP_BASE_URL),
      },
    },
  };
}

module.exports = devServer;
