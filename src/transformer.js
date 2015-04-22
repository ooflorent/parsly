import {isArray, isObject, mapValues} from './utils'

function compile(expr) {
  if (typeof expr === 'object') {
    return (node, context) => {
      for (let key in expr) {
        if (!expr[key](node[key], context)) {
          return false
        }
      }

      return true
    }
  }

  return (node, context) => expr(node, context)
}

export function subtree(node) {
  return node != null
}

export function simple(node) {
  return subtree(node) && !isArray(node) && !isObject(node)
}

export function sequence(node) {
  return subtree(node) && isArray(node) && node.every(simple)
}

export default class Transformer {
  static subtree = subtree
  static simple = simple
  static sequence = sequence

  constructor(rules = []) {
    this.rules = rules.map(({match, transform}) => ({match: compile(match), transform}))
  }

  rule(match, transform) {
    this.rules.push({match: compile(match), transform})
    return this
  }

  run(node, context) {
    const runInContext = (child) => this.run(child, context)

    if (isArray(node)) {
      node = node.map(runInContext)
    } else if (isObject(node)) {
      node = mapValues(node, runInContext)
    }

    for (let i = 0; i < this.rules.length; i++) {
      const {match, transform} = this.rules[i]
      if (match(node, context)) {
        return transform(node, context)
      }
    }

    return node
  }
}
