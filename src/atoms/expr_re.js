import Atom from './base'

export default class ExprRe extends Atom {
  constructor(expr, group = 0) {
    super()
    this._pattern = new RegExp(`^(?:${ expr.source })`, expr.flags)
    this._group = group
    this._origin = expr
  }

  run(stream, index) {
    const match = this._pattern.exec(stream.substr(index))
    if (match) {
      const fullMatch = match[0]
      const groupMatch = match[this._group]


      if (groupMatch != null) {
        return this._resolve(index + fullMatch.length, groupMatch)
      }
    }

    return this._reject(index, this._origin)
  }
}
