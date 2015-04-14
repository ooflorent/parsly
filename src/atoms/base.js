import flatten from '../flatten'
import {resolve, reject} from '../result'

export default class Atom {
  run(stream, index) {
    throw new Error()
  }

  parse(stream) {
    const result = this.run(String(stream), 0)

    if (result.status) {
      return this._flatten(result.value)
    }

    throw new SyntaxError(result.expected)
  }

  _flatten(values, named) {
    return flatten(values, named)
  }

  _resolve(index, value) {
    return resolve(index, value)
  }

  _reject(index, expected) {
    return reject(index, expected)
  }
}
