// findIndex
function findIndex(arr, predicate, context) {

  // i = arr.length - 1就是findLastIndex了 
  for (let i = 0; i < arr.length; i++) {
    if (predicate.call(context, arr[i], i, arr)) return i;
  }
  return -1;
}

// sortedIndex
// 需求是: 
// 一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态
function cb(func, context) {
  if (context === void 0) return func;
  return function() {
    return func.apply(context, arguments);
  }
}
function sortedIndex(arr, target, iteratee, context) {

  let low = 0, high = arr.length - 1;
  iteratee = cb(iteratee, context);

  while (low < high) {
    let mid = Math.floor((low + high)/2);
    if (iteratee(target) < iteratee(arr[mid])) {
      high = mid;
    } else {
      low = mid + 1;
    } 
  }

  return high;
}
// var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];
// var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
//     return stooge.age
// });
