import Atom from './base'

export default class Lazy extends Atom {
  constructor(fn) {
    super()
    this._fn = fn
    this._parser = null
  }

  run(stream, index) {
    if (this._parser === null) {
      this._parser = this._fn()
    }

    return this._parser.run(stream, index)
  }
}
