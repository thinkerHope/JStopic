// 写一个简单的判断类型的函数
// 主要利用Object.prototype.toString.call()
Object.prototype.toString.call([]) // [object, Array]
Object.prototype.toString.call(obj) // [Object Object]
Object.prototype.toString.call(function() {}) // [object Function]
Object.prototype.toString.call(null) // [object Null]
Object.prototype.toString.call(undefined) // [object Undefined]
Object.prototype.toString.call(1) // [object Number]
Object.prototype.toString.call(Symbol()) // [object Symbol]

function type(obj) {
  if (typeof obj == "object") {
    return Object.prototype.toString.call(obj).replace("[object ", "").replace("]", "").toLowerCase();
  } else {
    return typeof(obj);
  }
}