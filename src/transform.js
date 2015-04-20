import {isArray, isObject, mapValues} from './utils'

// Match API
// ---------

export function subtree(node) {
  return node != null
}

export function simple(node) {
  return subtree(node) && !isArray(node) && !isObject(node)
}

export function sequence(node) {
  return subtree(node) && isArray(node) && node.every(simple)
}

// Transform API
// -------------

export default class Transform {
  constructor(rules = []) {
    this.rules = rules
  }

  rule(match, transform) {
    this.rules.push([ match, transform ])
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
      const [match, transform] = this.rules[i]
      if (match(node, context)) {
        return transform(node, context)
      }
    }

    return node
  }
}

export class Node {
  constructor(data) {
    if (isObject(data)) {
      Object.assign(this, data)
    }
  }
}

// require() compatibility
// -----------------------

Transform.Node = Node
Transform.subtree = subtree
Transform.simple = simple
Transform.sequence = sequence
