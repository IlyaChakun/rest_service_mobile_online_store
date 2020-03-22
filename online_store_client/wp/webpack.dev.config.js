/* Development config:
   ========================================================================== */

const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",

    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        port: 3000,
        historyApiFallback: true,

        overlay: {
            warnings: true,
            errors: true
        }
    },


    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});


