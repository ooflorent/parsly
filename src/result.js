export class Result {
  constructor(status, index, value, depth, expected) {
    this.status = status
    this.index = index
    this.value = value
    this.depth = depth
    this.expected = expected
  }

  aggregate(other) {
    if (other == null || this.depth >= other.depth) {
      return this
    }

    return new Result(this.status, this.index, this.value, other.depth, other.expected)
  }
}

export function resolve(index, value) {
  return new Result(true, index, value, -1, null)
}

export function reject(index, expected) {
  return new Result(false, -1, null, index, expected)
}
