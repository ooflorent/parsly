import Atom from './base'

export default class Named extends Atom {
  constructor(atom, name) {
    super()
    this._atom = atom
    this._name = name
  }

  run(stream, index) {
    const result = this._atom.run(stream, index)

    if (!result.status) {
      return result
    }

    const value = {
      [this._name]: this._flatten(result.value, true),
    }

    return this._resolve(result.index, value).aggregate(result)
  }
}
