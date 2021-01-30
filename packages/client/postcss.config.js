module.exports = {
    plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        require("@fullhuman/postcss-purgecss")({
            content: ["./index.html", "./src/**/*.svelte"],
        }),
    ],
}
