import {custom, regex, string, any, alt, seq as sq, lazy, Parser} from 'parsimmon'

const _ = Parser.prototype

_.maybe = function() {
  return this.times(0, 1).map(r => r[0])
}

_.as = function(name) {
  return this.map((r) => ({[name]: r}))
}

_.repeat = function(min = 0, max = Infinity) {
  if (!Number.isInteger(max)) {
    return this.atLeast(min)
  }

  return this.times(min, max)
}

const _parse = _.parse

// Rewrite `parse` to throw on error
_.parse = function(stream) {
  const result = _parse.call(this, stream)

  if (result.status) {
    return result.value
  }

  throw new SyntaxError(result.expected)
}

// Parslet alias
export const match = regex
export const str = string
export const dynamic = custom
export const rule = lazy

// Parslet-like sequence
export function seq() {
  return sq(...arguments).map(function(result) {
    if (!Array.isArray(result)) {
      return result
    }

    return Object.assign(...result)
  })
}

export {any, alt}
