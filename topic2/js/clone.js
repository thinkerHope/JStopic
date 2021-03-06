// 浅拷贝
const shallowCopy = function(obj) {
  if (typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
          newObj[key] = obj[key];
      }
  }
  return newObj;
}

// 深拷贝
const deepCopy = function(obj) {
  if (typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    // 注意 for...in 会遍历原型链
      if (obj.hasOwnProperty(key)) {
          newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
      }
  }
  return newObj;
}

function reverse(list) {
  let p = list.head, q = null;
  while(p.next !== null) {
    q=p.next;
    p.next=q.next;
    q.next=list.head.next;
    list.head.next=q;
  }
  return list;
}

