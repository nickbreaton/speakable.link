import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname }from 'path'
import { en as naughtyWords } from 'naughty-words'
import { fileURLToPath } from 'url'

const getAbsolutePath = file => resolve(dirname(fileURLToPath(import.meta.url)), file)
const normalize = word => word.toLowerCase().trim()
const readList = filePath => readFileSync(filePath).toString('utf-8').split('\n')

const wordsPath = getAbsolutePath('./src/words.txt')
const words = readList(wordsPath)

const normalized = words.map(normalize)

const deduped = Array.from(new Set(normalized))

const disallowedWords = naughtyWords
    .concat(readList(getAbsolutePath('./src/disallow.txt')))
    .concat(readList(getAbsolutePath('./src/homophones.txt')))
    .map(normalize)

const disallowSet = new Set(disallowedWords)

const safe = deduped.filter(word => {
    return word.match(/^[a-z]+$/) && word.length > 2 && !disallowSet.has(word)
})

const dist = getAbsolutePath('./dist')

try { mkdirSync(dist) } catch (_) { /* ignore */ }

writeFileSync(wordsPath, safe.sort().join('\n'))
writeFileSync(resolve(dist, 'index.js'), `
    export const words = ${JSON.stringify(safe)}
    export const disallow = ${JSON.stringify(disallowedWords)}
`)