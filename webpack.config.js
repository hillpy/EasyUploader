const webpack = require("webpack");
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "easyuploader.js",
    },
    devtool: "none",
    devServer: {
        contentBase: "./example",
        host: "localhost",
        port: 1180,
        historyApiFallback: true,
        inline: true,
        hot: true,
        compress: false,
        overlay: true,
        stats: "errors-only",
        open: true,
    }
};
