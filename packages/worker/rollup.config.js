import typescript from "@rollup/plugin-typescript"

export default {
    input: "src/worker.ts",
    output: {
        dir: "dist",
        format: "iife",
    },
    plugins: [typescript()],
}
