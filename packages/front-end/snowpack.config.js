/**
 * @type {import('snowpack').SnowpackConfig}
 */
module.exports = {
    buildOptions: {
        baseUrl: "https://speakable-link.web.app/"
    },
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-svelte",
        "@snowpack/plugin-postcss",
        [
            "@snowpack/plugin-webpack",
            { outputPattern: { js: "_app/[name].[hash].js", css: "_app/[name].[hash].css" } }
        ]
    ],
    routes: [
        { match: "routes", src: ".*", dest: "/_app/index.html" }
    ],
    mount: {
        src: "/_app",
    },
}
