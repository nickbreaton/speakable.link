import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname }from 'path'
import { en as naughtyWords } from 'naughty-words'
import { fileURLToPath } from 'url'

const getAbsolutePath = file => resolve(dirname(fileURLToPath(import.meta.url)), file)
const normalize = word => word.toLowerCase()
const readList = filePath => readFileSync(filePath).toString('utf-8').split('\n')

const wordsPath = getAbsolutePath('./src/words.txt')
const words = readList(wordsPath)

const deduped = Array.from(new Set(words))

const normalized = deduped.map(normalize)

const disallowedWords = readList(getAbsolutePath('./src/disallow.txt')).concat(naughtyWords)
const disallowSet = new Set(disallowedWords.map(normalize))

const homophones = readList(getAbsolutePath('./src/homophones.txt'))
const homophonesSet = new Set(homophones.map(normalize))

const safe = normalized.filter(word => {
    return word.match(/^[a-z]+$/) && !disallowSet.has(word) && !homophonesSet.has(word)
})

const dist = getAbsolutePath('./dist')

try { mkdirSync(dist) } catch (_) { /* ignore */ }

writeFileSync(wordsPath, safe.sort().join('\n'))
writeFileSync(resolve(dist, 'index.js'), `
export const words = ${JSON.stringify(safe)}
export const disallow = ${JSON.stringify(disallowedWords)}
`)