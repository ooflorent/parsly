import {resolve, reject} from '../result'
import flatten from './flatten'

export default class Atom {
  run(stream, index) {
    throw new Error()
  }

  parse(stream) {
    const result = this.run(String(stream), 0)

    if (result.status) {
      return flatten(result.value)
    }

    throw new SyntaxError(result.expected)
  }

  _resolve(index, value) {
    return resolve(index, value)
  }

  _reject(index, expected) {
    return reject(index, expected)
  }
}
