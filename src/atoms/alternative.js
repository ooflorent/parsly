import Atom from './base'

export default class Alternative extends Atom {
  constructor(atoms) {
    super()
    this._atoms = atoms
  }

  run(stream, index) {
    let result

    for (let i = 0; i < this._atoms.length; i++) {
      result = this._atoms[i].run(stream, index).aggregate(result)

      if (result.status) {
        return result
      }
    }

    return result
  }
}
