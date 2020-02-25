let log = console.log.bind(console);
// 模拟实现 Promise/A+
function NewPromise(fn) {
  this.state = "pending";
  this.value = null;
  this.callbacks = [];
  fn(this.resolve.bind(this));
}

NewPromise.prototype = {

  constructor: NewPromise,

  then(onFulfilled) {
  
    return new Promise(resolve => {
      handle({
        onFulfilled: onFulfilled || null,
        resolve,
      });
    });
  },
  handle(callback) {
    const { state, callbacks } = props;
    if (state === "pending") {
      callbacks.push(callback);
      return;
    }
    if (!callback.onFulfilled) {
      callback.resolve(value);
      return;
    }
    const ret = callback.onFulfilled();
    callback.resolve(ret); 
  },
  resolve(newValue) {
    // 无延时机制的话, resolve会在then注册回调之前就执行了
    // 到这里依然有问题, 异步完成之后, 异步操作成功之前注册的回调会立即执行,在这之后注册的就不会执行了。加入状态
    // 再加入链式Promise, then中是一个Promise。让hen返回一个Promise就好了。
    if (newValue && (typeof newValue === "object")) {
      const then = newValue.then;
      then.call(newValue, resolve);
      return;
    }
    value = newValue;
    this.state = "fulfilled";
    setTimeout(() => {
      this.callbacks.forEach(callback => handle(callback));
    }, 0);
  },
};



const P = new NewPromise((resolve) => {
  resolve("asdgas");
});
P.then(res => console.log(res));
// 链式Promise, 当前Promise结束，立即开始下一个Promise
function getUser() {
  return new Promise(reoslve => resolve());
}
P.then(getUser).then(res => console.log(res));

