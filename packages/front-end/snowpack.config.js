/**
 * @type {import('snowpack').SnowpackConfig}
 */
module.exports = {
    plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-svelte"],
    routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
}
