import {isArray, isObject, isString} from './utils'

const notEmpty = (x) => x !== '' && x != null
const mergeArrays = (a, b) => (a.push(...b), a)
const mergeObjects = (a, b) => Object.assign(a, b)
const concatenate = (a, b) => a + b

const merge = (a, b) => {
  if (a.constructor === b.constructor) {
    if (isArray(a)) return mergeArrays(a, b)
    if (isObject(a)) return mergeObjects(a, b)
    return a + b
  }

  if (isString(a)) return b
  if (isString(b)) return a
  if (isArray(a)) return (a.push(b), a)
  if (isArray(b)) return (b.push(a), b)

  throw new Error(`Unexpected case`)
}

function flattenSequence(values) {
  return values.filter(notEmpty).reduce(merge, '')
}

function flattenRepetition(values, named) {
  if (named && values.length === 0) {
    return []
  }

  if (values.some(isObject)) {
    return values.filter(isObject)
  }

  if (values.some(isArray)) {
    return values.filter(isArray).reduce(mergeArrays, [])
  }

  return values.reduce(concatenate, '')
}

export default function flatten(values, named = false) {
  if (!isArray(values)) {
    return values
  }

  const [tag, ...tail] = values
  const result = tail.map((x) => flatten(x))

  switch (tag) {
    case 'maybe': return named ? result[0] : (result[0] || '')
    case 'repetition': return flattenRepetition(result, named)
    case 'sequence': return flattenSequence(result)
  }

  throw new Error(`Unknown tag '${ tag }'`)
}
