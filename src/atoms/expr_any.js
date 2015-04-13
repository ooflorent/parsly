import Atom from './base'

export default class ExprAny extends Atom {
  run(stream, index) {
    if (index < stream.length) {
      return this._resolve(index + 1, stream.charAt(index))
    }

    return this._reject(index, 'any')
  }
}
