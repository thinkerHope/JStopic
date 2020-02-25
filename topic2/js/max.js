let arr = [6, 4, 1, 8, 2, 11, 23];

// reduce
function max(arr) {

  return arr.reduce((prev, next) => {
     return Math.max(prev, next);
  });
}

// eval
const max = eval("Math.max(" + arr + ")");
// 用Function代替糟糕的eval()
const max = (...rest) => {
  let _arr = Array.isArray(rest) ? rest : [];
  const fn = new Function("arr", `${"return Math.max("+ _arr.toString() + ")"}`);
  return fn();
}

// apply
Math.max.apply(void 0, arr)

// ES6
Math.max(...arr)
