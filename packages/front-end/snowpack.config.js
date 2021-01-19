/**
 * @type {import('snowpack').SnowpackConfig}
 */
module.exports = {
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-svelte",
        "@snowpack/plugin-postcss",
    ],
    routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
}
