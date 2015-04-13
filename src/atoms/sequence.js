import Atom from './base'

export default class Sequence extends Atom {
  constructor(atoms) {
    super()
    this._atoms = atoms
  }

  run(stream, index) {
    const values = ['sequence']
    let result

    for (let i = 0; i < this._atoms.length; i++) {
      result = this._atoms[i].run(stream, index).aggregate(result)

      if (!result.status) {
        return result
      }

      values.push(result.value)
      index = result.index
    }

    return this._resolve(index, values).aggregate(result)
  }
}
