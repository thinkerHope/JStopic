// 兼容性好的双层循环
function uniqueOne(arr) {
  let res = [];
  let i,j;
  let arrayLen,resLen;

  for(i = 0, arrayLen = arr.length; i < arrayLen; i++) {
    for(j = 0, resLen = res.length; j < resLen; j++) {
      if(arr[i] === res[j]) {
        break;
      }
    }
    if(j === resLen) {
      res.push(arr[i]);
    }
  }

  return res;
}

// indexOf
// function uniqueSecond(array) {
//   let res = [];
//   for (let i = 0, len = array.length; i < len; i++) {
//       let current = array[i];
//       if (res.indexOf(current) === -1) {
//           res.push(current)
//       }
//   }
//   return res;
// }

// 简化
function uniqueSecond(array) {
  let res = array.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
  
  return res;
}
// console.log(uniqueSecond(["2",2,"1","2",2,1,1,"1"]))

// 排序后去重
// sort()的结果并不一定是想要的结果, 
// 这个不靠谱
function uniqueThird(array) {
  let res = [];
  let sortedArr = array.concat().sort();
  res.push(sortedArr[0]);
  for(let i = 0; i < sortedArr.length-1; i++) {
    if(sortedArr[i] !== sortedArr[i+1]) {
      res.push(sortedArr[i+1]);
    }
  }
  
  return res;
}

// 定制自己的uniqueUtil
function unique(arr, iteratee) {
  let res = [];
  let len = arr.length;

  for(let i = 0; i < len; i++) {
    let value = arr[i];
    let computed = iteratee ? iteratee(value, i, arr) : value;
    
    if(res.indexOf(computed) === -1) {
      res.push(computed);
    }
  }

  return res;
}
// console.log(unique(["2","1",2,"1",2,2,1,1,"3","4",3,"3","a","A"], (item) => {return typeof item == "string" ? item.toLowerCase() : item}));

// Object键值对
// function uniqueForth(arr) {
//   let obj = {};
//   let res = arr.filter((item, index, array) => {

//     return obj.hasOwnProperty(typeof item + item) ? false : obj[typeof item + item] = true;
//   });

//   return res;
// }

// typeof {} + {} => object[object object]
// 优化
function uniqueForth(arr) {
  let obj = {};
  let res = arr.filter((item, index, array) => {
    
    return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : 
    (obj[typeof item + JSON.stringify(item)]=true);
  });

  return res;
}

// let arr = [{value: 1}, {value: 2}, {value: 1}];
// console.log(uniqueForth(arr));

// ES6的 Set 和 Map
const uniqueWithSet = (arr) => [...new Set(arr)]
const uniqueWithSet = (arr) => Array.from(new Set(arr.map(item => JSON.stringify(item))), item => JSON.parse(item)); 

// Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
const uniqueWithMap = (arr) => {
  const seen = new Map();
  return arr.filter(item => !seen.has(JSON.stringify(item)) && seen.set(JSON.stringify(item) ,1));
}
let arr = [{value: 1}, {value: 2}, {value: 1}];
console.log(uniqueWithSet(arr));