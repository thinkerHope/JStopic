const arr = [1, [2, [3, 4, [4, 5, 6]]]];

// 递归
function flatten(arr) {

  let result = [];

  for (let i = 0; i < arr.length; i++) {

    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result[i] = arr[i];
    }
  }

  return result;
}

// toString()
// 要求元素都是数字
function flatten(arr) {
  return arr.toString().split(',').map(function(item){
      return +item
  })
}

// reduce -- 递归的简化
function flatten(arr) {

  return arr.reduce((prev, next) => {
    const result = Array.isArray(next) ? flatten(next) : next;
    return prev.concat(result)
  }, []);
}

// ES6 ...
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr;
}

// replace的骚操作
let arr = [1,[2,[3,5,[3,7,9]]],[2,4,[3]],7];
let arrStr = JSON.stringify(arr);
arr = arrStr.replace(/(\[ | \])/g, "").split(",");
