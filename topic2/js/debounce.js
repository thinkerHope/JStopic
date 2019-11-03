// 完善了this, e
// 完善immediate: boolean
// 扩展需求1 我希望立刻执行函数, 然后等到停止触发n秒后, 才可以重新触发执行。
// 扩展需求2 取消防抖, 回复立即执行(immediate为true时)
let count = 1;
const container = document.getElementById("container");

function getUserAction(e) { 
  container.innerHTML = count++;
}

const debounce = (func, wait, immediate) => {
  let timeout;
  let result;
  // 这里的闭包不能是箭头函数
  const debounced = function(...rest) {
    timeout && clearTimeout(timeout);
    if(immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      callNow && (result = func.call(this, rest));
    } else {
      timeout = setTimeout(() => {
        func.call(this, rest);
      }, wait);
    }
    return result;
  };

  debounced.cancle = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

const setUseAction = debounce(getUserAction, 10000, true);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener("click", () => {
  setUseAction.cancle();
})


