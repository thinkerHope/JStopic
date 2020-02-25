// 自己写一版
// 判断对象相等的步骤： 

// 1. 先判断俩者是不是对象
// 2. 是对象后俩者长度是否一致
// 3. 判断俩个对象的所有key值是否相等相同
// 4. 判断俩个对象的相应的key对应的值是否相同
// 5. 来一个递归判断里面的对象循环1-4步骤

function equalObj(obj1, obj2) {

  const keys_1 = Object.keys(obj1);
  const keys_2 = Object.keys(obj2);
  const les_1 = keys_1.length;
  const les_2 = keys_2.length;
  if (obj1.constructor == Object && obj2.constructor == Object) {
    const les = les_1;  
    if (les_1 === les_2 && les_1 == 0) return true;
    if (les_1 !== les_2) return false;
    for (let i = 0; i < les; i++) {
      if (!obj2.hasOwnProperty(keys_1[i])) return false;
      return obj1[keys_1[i]].constructor == Object ? 
      equalObj(obj1[keys_1[i]], obj2[keys_1[i]]) : obj1[keys_1[i]] === obj2[keys_1[i]];
    }
  } else {
    return false;
  }
}
// 测试通过
console.log(equalObj({a:1,b:2,v:2, f: {a:1,b:2, g: {a:3,b:4}}, d:3}, {a:1,b:2,v:2, f: {a:1,b:2, g: {a:3,b:4}}, d:3}));

