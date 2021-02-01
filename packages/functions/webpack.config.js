const nodeExternals = require("webpack-node-externals")

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    target: "node",
    externalsPresets: { node: true },
    output: {
        filename: "index.js",
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.ts$/, loader: "ts-loader" },
        ],
    },
    externals: [
        nodeExternals({
            allowlist: ["@speakable.link/words"],
        }),
    ],
}
