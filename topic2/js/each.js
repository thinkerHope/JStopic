// each为通用遍历方法(数组、对象、类数组)
// 和ES5的forEach的不同: 可退出循环
function isWindow(obj) {
  return obj != null && obj === obj.window;
}
function isArrayLike(obj) {
  let length = !!obj && "length" in obj && obj.length;
  let typeRes = type(obj);
  if(typeRes === "function" || isWindow(obj)) {
      return false;
  }
  return typeRes === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
}

