// import { SMART_CONTRACTS_API } from "@constants";

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
        ...proxyRule("/api", "https://mobile.sandbox-uni.876ex.com"),
      },
      "/smart-contracts": {
        ...proxyRule("/smart-contracts", "https://barnard-seed.starcoin.org"),
      },
    },
  };
}

module.exports = devServer;
