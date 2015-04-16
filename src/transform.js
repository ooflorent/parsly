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

  run(node) {
    if (isArray(node)) {
      node = this._recurseArray(node)
    } else if (isObject(node)) {
      node = this._recurseObject(node)
    }

    for (let i = 0; i < this.rules.length; i++) {
      const [match, transform] = this.rules[i]
      if (match(node)) {
        return transform(node)
      }
    }

    return node
  }

  _recurseArray(node) {
    return node.map(this.run, this)
  }

  _recurseObject(node) {
    return mapValues(node, this.run, this)
  }
}

Transform.subtree = subtree
Transform.simple = simple
Transform.sequence = sequence
