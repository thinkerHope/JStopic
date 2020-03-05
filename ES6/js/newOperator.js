function newOperator(ctor) {
  if (typeof ctor !== 'function') {
    throw new Error('fucking function needed!')
  }
  newOperator.target = ctor
  const newObj = Object.create(ctor.prototype)
  const argsArr = [].slice.apply(arguments, 1)
  const ctorReturnResult = ctor.apply(newObj, argsArr)
  const isObject = typeof ctorReturnResult === 'object' && ctorReturnResult !== null
  const isFunction = typeof ctorReturnResult === 'function'
  if (isObject || isFunction) {
    return ctorReturnResult
  }
  return newObj
}