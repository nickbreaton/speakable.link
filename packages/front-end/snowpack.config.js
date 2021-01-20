/**
 * @type {import('snowpack').SnowpackConfig}
 */
module.exports = {
    buildOptions: {
        baseUrl: "https://speakable-link.firebaseapp.com/"
    },
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-svelte",
        "@snowpack/plugin-postcss",
        "@snowpack/plugin-optimize",
        ["snowpack-plugin-content-hash", { exts: ['.css', '.js'] }],
    ],
    routes: [
        { match: "routes", src: ".*", dest: "/_app/index.html" }
    ],
    mount: {
        src: "/_app",
    },
}
