// 节流原理: 持续触发事件, 每隔一段时间, 只执行一次事件。

let count = 1;
const container = document.getElementById("container");

function getUserAction(e) { 
  container.innerHTML = count++;
}

// 时间戳
// 开始执行, 结束不执行
// const throttle = (func, wait) => {
//   let previous = 0;

//   return function(...rest) {
//     let now = +new Date();
//     if(now - previous > wait) {
//       func.call(this, rest);
//       previous = now;
//     }
//   }
// } 

// 定时器
// 开始不执行, 最后会执行
// const throttle = (func, wait) => {
//   let timeout;

//   return function(...rest) {

//     if(!timeout) {
//       timeout = setTimeout(() => {
//         timeout = null;
//         func.call(this, rest);
//       }, wait);
//     }
//   }
// }

// 有头有尾的节流函数, 
// 并且增加了参数 options
// leading：false 表示禁用第一次执行
// trailing: false 表示禁用停止触发的回调
// 增加 cancle
const throttle = (func, wait, options={}) => {
  let timeout;
  let args;
  let result;
  let context;
  let previous = 0;

  const later = () => {
    previous = options.leading == false ? 0 : new Date().getTime();
    timeout = null;
    result = func.call(context, args);
    if(!timeout) context = args = null;
  }  

  const throttled = function(...rest) {
    args = rest;
    context = this;
    let now = (!previous && options.leading == false) ? 0 : (new Date().getTime());
    // 下次触发 func 剩余的时间
    let remaining = wait - (now - previous);
    // 如果修改系统时间可能出现 remaining > wait
    if(remaining <= 0 || remaining > wait) {
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      result = func.call(context, rest);
      previous = now;
      // 注意这里不能直接写成 options.trailing
    } else if(!timeout && options.trailing != false) {
      timeout = setTimeout(later, remaining);
    }
  }

  return throttled;
}

container.onmousemove = throttle(getUserAction, 1000, {leading: false});