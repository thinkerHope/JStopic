// Promise 的面试题
(function test() {
  setTimeout(function() {console.log(4)}, 0);
  new Promise(function executor(resolve) {
      console.log(1);
      for( var i=0 ; i<10000 ; i++ ) {
          i == 9999 && resolve();
      }
      console.log(2);
  }).then(function() {
      console.log(5);
  });
  console.log(3);
})()
// 1 2 3 5 4

let log = console.log.bind(console);

// Promise模型
function NewPromise(fn) {
  let state = 'pending'
  let callbacks = []
  let value = null

  this.then = function(onFullfilled, onRejected) {
    return new Promise((resolve, reject) => {
      handle({
        onFullfilled,
        resolve,
        onRejected,
        reject,
      })
    })
  }

  this.catch = function(onRejected) {
    this.then(null, onRejected)
  }

  this.finally = function(callback) {
    let P = this.constructor
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    )
  }

  function resolve(newValue) {
    const fn = () => {
      if (state !== 'pending') {
        return
      } else {
        // 链式调用
        if (newValue && 
          (
            typeof newValue === 'object' || 
            typeof newValue === 'function'
          )
        ) {
          const { then } = newValue
          // 让resolve延迟执行
          if (then) {
           then.call(newValue, resolve, reject) 
           return
          }
        }
        state = 'fulfilled'
        value = newValue
        handleCb()
      }
    }
    // 延迟机制, 保证resolve在then注册完成之后执行
    setTimeout(fn, 0)
  }

  function reject(error) {
    const fn = () => {
      if (state !== 'pending') {
        return 
      } else {
        if (error && 
          (
            typeof error === 'object' || 
            typeof error === 'function'
          )
        ) {
          const { then } = error
          then.call(error, resolve, reject)
          return
        }
        state = 'rejected'
        value = error
        handleCb()
      }
    }
    setTimeout(fn, 0)
  }

  function handle(callback) {
    if (state === 'pending') {
      callbacks.push(callback)
      return
    }
    const cb = state === 'fulfilled' ? callback.onFullfilled : callback.onRejected
    const next = state === 'fulfiiled' ? callback.resolve : callback.reject

    if (!cb) {
      next(value)
      return
    }
    // 新增异常处理
    try { 
      const result = cb(value)
      next(result)
    } catch(e) {
      callback.reject(e)
    }
  }

  function handleCb() {
    while (callbacks.length) {
      const fulfilledCb = callbacks.shift()
      handle(fulfilledCb)
    }
  }
  // 立即执行
  fn(resolve, reject)
}

NewPromise.resolve = function(value) {
  if (value && value instanceof Promise) {
    return value;
  } else if (value && typeof value === 'object' && typeof value.then === 'function') {
    let then = value.then
    return new Promise(resolve => {
        then(resolve)
    })
  } else if (value) {
      return new Promise(resolve => resolve(value))
  } else {
      return new Promise(resolve => resolve())
  }
}

NewPromise.reject = function(error) {
  return new Promise(function(resolve, reject) {
    reject(error)
  })
}

NewPromise.all = function(promises) {
  const args = Array.prototype.slice.call(promises)
  return new NewPromise((resolve, reject) => {
    if(args.length === 0) return resolve([])
    let remaining = args.length

    function res(i, val) {  
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          const { then } = val
          if (typeof then === 'function') {
            then.call(val, function(val) {
              res(i, val)
            }, reject)
            return
          }
        }
        args[i] = val
        if (--remaining === 0) {
          resolve(args)
        }
      } catch(e) {
        reject(e)
      }
    }

    for (let i = 0; i < args.length; i++) {
      res(i, args[i])
    }
  })
}

NewPromise.race = function(promises) {
  const args = Array.prototype.slice.call(promises)
  return new NewPromise((resolve, reject) => {
    try {
      for (let i = 0; i < args.length; i++) {
        const { then } = args[i]
        if (typeof then === 'function') {
          then.call(args[i], resolve, reject)
        }
      }
    } catch(e) {
      reject(e)
    }
  })
}