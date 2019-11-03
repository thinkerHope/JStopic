// 第一版
// function extend(target, ...rest) {
//   let options, copy, name;
//   let target = target;
//   let length = rest.length;

//   for(let i = 1; i < length; i++) {
//     options = rest[i];
//     if(options != null) {
//       for(name in options) {
//         copy = options[name];
//         if(copy != undefined) {
//           target[name] = copy;
//         }
//       }
//     }
//   }

//   return target;
// }

// 第二版, 实现深拷贝
// function extend(...rest) {
//   // 默认 flase
//   let deep = false;
//   let name, options, copy, src;
//   let length = rest.length;
//   let i = 1;
  
//   let target = rest[0] || {};

//   if(typeof target == "boolean") {
//     deep = target;
//     target = rest[1] || {};
//     i++;
//   }
//   // 只有target为对象, 才可以拷贝
//   if (typeof target !== "object") {
//     target = {};
//   }

//   for (; i < length; i++) {
//     options = rest[i];
//     if (options != "null") {
//       for (name in options) {
//         src = target[name]; //
//         copy = options[name];
//         //
//         if (deep && copy && typeof copy === "object") {

//           target[name] = extend(deep, src, copy);
//         }
//         else if (copy !== "undefined") {
//           target[name] = copy;
//         }
//       }
//     }
//   }

//   return target;
// }

// 最终版
function extend(...rest) {
  // 默认 flase
  let deep = false;
  let name, options, copy, src;
  let clone, copyIsArray;
  let length = rest.length;
  let i = 1;
  
  let target = rest[0] || {};

  if(typeof target == "boolean") {
    deep = target;
    target = rest[1] || {};
    i++;
  }
  // 只有target为对象, 才可以拷贝
  if (typeof target !== "object") {
    target = {};
  }

  for (; i < length; i++) {
    options = rest[i];
    if (options != "null") {
      for (name in options) {
        src = target[name]; //
        copy = options[name];
        // 优化循环引用
        if (target === copy) {
          continue;
        }
        //
        if (deep && copy && typeof copy === "object" || (copyIsArray = Array.isArray(copy))) {
          
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && typeof src === "object" ? src : {};
          }

          target[name] = extend(deep, clone, copy);
        }
        else if (copy !== "undefined") {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}