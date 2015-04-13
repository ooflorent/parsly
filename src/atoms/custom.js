import Atom from './base'
import {resolve, reject} from '../result'

export default class Custom extends Atom {
  constructor(fn) {
    super()
    this._fn = fn(resolve, reject)
  }

  run(stream, index) {
    return this._fn(stream, index)
  }
}
