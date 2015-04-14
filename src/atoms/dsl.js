import Named from './named'
import Repetition from './repetition'

export default {
  as(name) {
    return new Named(this, name)
  },

  repeat(min = 0, max = Infinity) {
    return new Repetition(this, min, max)
  },

  maybe() {
    return new Repetition(this, 0, 1, 'maybe')
  },

  many() {
    return this.repeat(0, Infinity)
  },

  times(n) {
    return this.repeat(n, n)
  },
}
