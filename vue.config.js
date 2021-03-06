const path = require("path");
const devServer = require("./src/scripts/devServer");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}

console.log(" process.env", process.env.NODE_ENV);

const isProduction = process.env.NODE_ENV === "production";
const plugins = isProduction
  ? [
      new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          //生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            dead_code: true,
            pure_funcs: ["console.log"], //移除console
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ]
  : [];
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    ...devServer(),
  },
  css: {
    // 为了解决css动画不起作用
    extract: false,
  },
  chainWebpack: (config) => {
    // alias
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@utils", resolve("src/utils"))
      .set("@components", resolve("src/components"))
      .set("@StarUI", resolve("src/components/StarUI"))
      .set("@api", resolve("src/api"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"))
      .set("@styles", resolve("src/styles"))
      .set("@scripts", resolve("src/scripts"))
      .set("@constants", resolve("src/constants"))
      .set("@mixins", resolve("src/mixins"))
      .set("@starMaskWallet", resolve("src/wallet"));

    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();

    // image
    config.module
      .rule("images")
      .exclude.add(resolve("src/icons"))
      .end()
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: true },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 },
      });
  },
  configureWebpack: {
    plugins: plugins,
  },
};
// css: {
// loaderOptions: {
// css: {
//   modules: {
//     localIdentName: "[name]-[hash]",
//   },
//   localsConvention: "camelCaseOnly",
// },
// },
// },
// };
