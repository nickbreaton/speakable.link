/**
 * @type {import('snowpack').SnowpackConfig}
 */
module.exports = {
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-svelte",
        "@snowpack/plugin-postcss",
        [
            "@snowpack/plugin-optimize",
            { target: "es2018", preloadModules: true },
        ],
    ],
    routes: [{ match: "routes", src: ".*", dest: "/_app/index.html" }],
    mount: {
        src: "/_app",
    },
}
