// call实现
function sum(){
  console.log(this);
}
function fn(){
  console.log(this);
}
Function.prototype.myCall = function (context) {
// 允许传null
  let context = context || window;
  context.fn = this;
  // 重新执行这个函数
  let args = [];
  for (let i = 0; i < arguments.length; i++) {
      args.push("arguments[" + i + "]");
  }
  // 函数是可以有返回值的
  let result = new Function("",  `${ "context.fn(" + args + ")" }`)();
  
  delete context.fn;
  return result;
};
fn.myCall(obj); // fn作为普通对象, 所以myCall中的this为fn函数本身
sum.myCall(obj);


