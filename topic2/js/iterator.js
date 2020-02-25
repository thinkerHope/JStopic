const o = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    let i = 0;
    let keys = Object.keys[this];

    return next = () => {
      return {
        value: this[keys[i++]],
        done: i > keys.length,
      }
    }
  },
}

// 简化版
const o1 = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function* () {
    for(let key in this) {
      yield this[key];
    }
  }
}

for (let key in o1) {
  console.log(o1[key])
}

// ES9版异步迭代
