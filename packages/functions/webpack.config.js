const nodeExternals = require("webpack-node-externals")

module.exports = {
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    target: "node",
    externalsPresets: { node: true },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [{ test: /\.ts$/, loader: "ts-loader" }],
    },
    externals: [
        nodeExternals({
            allowlist: ["@speakable.link/words"],
        }),
    ],
}
