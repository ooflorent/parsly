import Atom from './base'

export default class Repetition extends Atom {
  constructor(atom, min, max, tag = 'repetition') {
    super()

    if (max < min) {
      throw new Error()
    }

    this._atom = atom
    this._min = min
    this._max = max
    this._tag = tag
  }

  run(stream, index) {
    const values = [this._tag]
    let result

    for (let iteration = 0; iteration < this._max;) {
      result = this._atom.run(stream, index).aggregate(result)

      if (result.status) {
        iteration++
        values.push(result.value)
        index = result.index
        continue
      }

      if (iteration >= this._min) {
        break
      }

      return result
    }

    return this._resolve(index, values).aggregate(result)
  }
}
