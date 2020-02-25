// 一个简易的缓存函数
function memorize(func) {
  let lastInput = null
  let lastOuput = null
  return function() {
  	// 这里使用浅比较来判断参数是否一致
    if (!shallowEqual(lastInput, arguments)) {
      lastOuput = func.apply(null, arguments)
    }
    lastInput = arguments
    return lastOuput
  }
}

function shallowEqual (objA, objB) {
  if (is(objA, objB)) {
    return true
  }
  
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false;
    }
  }

  return true
}