/**
 * Cloudflare Worker secrets only hold up to 1KB,
 * so we must split before uploading...
 */

const path = require("path")
const fs = require("fs")
const cp = require("child_process")

const filePath = process.argv[2]

if (!filePath) {
    console.error("Path to service account file required!")
    process.exit(1)
}

const contents = fs.readFileSync(path.resolve(filePath), "utf8")
const smallestJSON = JSON.stringify(JSON.parse(contents))
const chunks = smallestJSON.match(/.{1,1000}/g)

async function exec() {
    for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        const part = i + 1
        const command = `wrangler secret put FIREBASE_SERVICE_ACCOUNT_PART_${part}`
        const child = cp.exec(command)
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
        child.stdout.once("data", () => {
            child.stdin.setDefaultEncoding("utf8")
            child.stdin.write(chunk)
            child.stdin.end()
        })
        await new Promise((res) => {
            child.stdout.once("close", () => res())
        })
    }
}

exec()
