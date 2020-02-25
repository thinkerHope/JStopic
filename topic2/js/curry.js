// 补个知识点
// (function(...args) {}).length
// length函数对象的一个属性值
// 无默认值
// ((function(a,b,c) {}).length) //3
// 有默认值
// ((function(a,b=1,c) {}).length) //1

function add() {

  let sum = arguments[0] ? Number(arguments[0]) : 0;
  
  const tempFunc = function(num) {
    sum += num;
    console.log(sum)
    return tempFunc;
  }
  tempFunc.toString = function() {
    return sum;
  }
  if (arguments.length > 1) {
    return [].slice.call(arguments).reduce((prev, next) => {
      return prev + next;
    }, 0);
  } else {
    return function() {
      // 注意这里的一个小细节，卡了我好久
      // 我直接写成tempFunc(arguments[0])了，要return a，不然add(1)(2)是undefined
      const a = tempFunc(arguments[0]);
      return a;
    }
  } 
}
console.log(add(1, 2, 3, 4, 5))
console.log(add(1)(2)(3)(4)(5))

第一版
fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

function curry(fn) {


}

