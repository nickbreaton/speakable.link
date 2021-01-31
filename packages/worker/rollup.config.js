import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import injectProcessEnv from "rollup-plugin-inject-process-env"

export default {
    input: "src/worker.ts",
    output: {
        dir: "dist",
        format: "iife",
    },
    plugins: [
        nodeResolve(),
        commonjs(),
        typescript(),
        injectProcessEnv({ NODE_ENV: process.env.NODE_ENV }),
    ],
}
