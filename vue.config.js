const path = require("path");
// import { devServer } from '@scripts/devServer';
const devServer = require("./src/scripts/devServer");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    ...devServer(),
  },
  chainWebpack: (config) => {
    // 别称
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@utils", resolve("src/utils"))
      .set("@components", resolve("src/components"))
      .set("@startUI", resolve("src/components/StartUI"))
      .set("@api", resolve("src/api"))
      .set("@utils", resolve("src/utils"))
      .set("@views", resolve("src/views"))
      .set("@store", resolve("src/store"))
      .set("@styles", resolve("src/styles"))
      .set("@scripts", resolve("src/scripts"))
      .set("@constant", resolve("src/constant"));

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
  },
  // css: {
  //   requireModuleExtension: false,
  //   loaderOptions: {
  //     css: {
  //       modules: {
  //         localIdentName: "[name]-[hash]",
  //       },
  //       localsConvention: "camelCaseOnly",
  //     },
  //   },
  // },
};
