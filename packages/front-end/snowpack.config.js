/**
 * @type {import('snowpack').SnowpackConfig}
 */
module.exports = {
    buildOptions: {
        baseUrl: "https://speakable-link.firebaseapp.com"
    },
    plugins: [
        "@snowpack/plugin-typescript",
        "@snowpack/plugin-svelte",
        "@snowpack/plugin-postcss",
        [
            "@snowpack/plugin-webpack",
            { outputPattern: { js: "[name].[hash].js", css: "[name].[hash].css" } }
        ]
    ],
    routes: [
        { match: "routes", src: ".*", dest: "/index.html" }
    ],
    mount: {
        src: "/",
    },
}
