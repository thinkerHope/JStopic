let class2type = {};

"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").map(item => {
  class2type["[object " + item + "]"] = item.toLowerCase();
});

function baseType(obj) {
  return typeof obj === "object" || typeof obj === "Function" ?
    class2type[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}

// 可以来一波封装了...
const isFunction = (obj) => baseType(obj) === "function"
const isArray = Array.isArray || ((obj) => baseType(obj) === "array");
