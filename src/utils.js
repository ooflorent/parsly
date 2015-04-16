export const isArray = (x) => Array.isArray(x)
export const isObject = (x) => x != null && x.constructor === Object
export const isString = (x) => x != null && x.constructor === String

export const mapValues = (object, iteratee, thisArg) => {
  const result = {}
  for (let key in object) {
    result[key] = iteratee.call(thisArg, object[key])
  }

  return result
}
