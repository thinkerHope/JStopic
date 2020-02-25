function myBind() {

  let self=this;//保存原函数
  let context=[].shift.call(arguments);//保存需要绑定的this上下文
  let args=[].slice.call(arguments);//将剩余参数转化为数组
  return function(){
    self.apply(context,[].concat.call(args, [].slice.call(arguments)));
  }
}