module.exports = {
    apps: [
        {
            name: "client",
            script: "npm start",
            cwd: "./packages/client",
            watch: false,
        },
        {
            name: "functions:compile",
            script: "npm run watch",
            cwd: "./packages/functions",
            watch: false,
        },
        {
            name: "functions:serve",
            script: "npm run emulate",
            cwd: "./packages/functions",
            watch: ["./dist"],
        },
    ],
}
