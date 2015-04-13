import Atom from './base'

export default class ExprStr extends Atom {
  constructor(string) {
    super()
    this._string = string
    this._length = string.length
  }

  run(stream, index) {
    if (stream.substr(index, this._length) === this._string) {
      return this._resolve(index + this._length, this._string)
    }

    return this._reject(index, this._string)
  }
}
