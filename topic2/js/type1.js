let class2type = {};

"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(item => {
  class2type["[object " + item + "]"] = item.toLowerCase();
});

let toString = Object.prototype.toString;
let hasOwn = class2type.hasOwnProperty;

// isPlainObject
function isPlainObject(obj) {
  let proto, Ctor;

  if(!obj || toString.call(obj) !== "[object object]") {
    return false;
  }
  // es5方法
  proto = Object.getPrototypeOf(obj);

  if(!proto) {
    return true;
  }

  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  // 用于区分自定义构造函数和 Object 构造函数
  return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

// EmptyObject, 这里只要求判断某个对象是不是空
// 如果一定要求是{}, 可以 JSON.stringify(obj) === "{}"
function isEmptyObject(obj) {
  let name;
  // 注意 for in 会遍历原型上面的属性
  for(name in obj) {
    return false;
  }

  return true;
}

// Window对象
// Window 对象作为客户端 JavaScript 的全局对象，
// 它有一个 window 属性指向自身
function isWindow(obj) {
  return obj != null && obj === obj.window;
}

// isArrayLike
// 数组和类数组都会返回true
function isArrayLike(obj) {
  // obj 必须有 length属性
  let length = !!obj && "length" in obj && obj.length;
  let typeRes = type(obj);
  // 排除掉函数和 Window 对象
  if(typeRes === "function" || isWindow(obj)) {
      return false;
  }
  // 符合条件的类数组对象是一定存在最后一个元素的
  return typeRes === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
}

// isElement
isElement = function(obj) {
  return !!(obj && obj.nodeType === 1);
};