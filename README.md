# TopicJS

## 补充说明

### topic1

### topic2

(1)关于 ES6 数据结构 Set
Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。

(2)关于类型检查
ES6前的数据类型 Undefined、Null、Boolean、Number、String、Object

如果只是typeof x 或typeof()是不能一一对应的:
typeof Object === typeof null
Object还分Array、Function、Date、RegExp、Error 等:
typeof new Date() === new Error()

解决
Object.prototype.toString.call()
注意
Object.prototype.toString.call(new Person()) //[object Object]
Object.prototype.toString.call(Object.create({})) //[object Object]
Object.prototype.toString.call(window) //[object Window],但是处于兼容性考虑, 并没有用这个

"纯粹的对象" plainObject = "{}" 或 "new Object()"创建的对象
jq实例
function Person(name) {
    this.name = name;
}
console.log($.isPlainObject({})) // true
console.log($.isPlainObject(new Object)) // true
console.log($.isPlainObject(Object.create(null))); // true
console.log($.isPlainObject(Object.assign({a: 1}, {b: 2}))); // true
console.log($.isPlainObject(new Person('yayu'))); // false
console.log($.isPlainObject(Object.create({}))); // false

可以看到除了 {} 和 new Object 创建的之外，jQuery 认为一个没有原型的对象也是一个纯粹的对象。

console.log(hasOwn.toString.call(Ctor)); // function Object() { [native code] }
console.log(Object.prototype.toString.call(Ctor)); // [object Function]
发现返回的值并不一样，这是因为 hasOwn.toString 调用的其实是 Function.prototype.toString，毕竟 hasOwnProperty 可是一个函数！

而且 Function 对象覆盖了从 Object 继承来的 Object.prototype.toString 方法。函数的 toString 方法会返回一个表示函数源代码的字符串。具体来说，包括 function关键字，形参列表，大括号，以及函数体中的内容。

(3)拷贝
简单粗暴 深拷贝数组 JSON.parse(JSON.stringify(arr))
但是对于函数
var arr = [function(){}, {b: function(){}}]
var new_arr = JSON.parse(JSON.stringify(arr));
console.log(new_arr);
输出: [null, {}]

如果对象是数组的情况
const arr1 = ["a","s"]
for (var key in arr1) {
    if (arr1.hasOwnProperty(key)) {
        console.log(key)
    }
}
输出: 0,1

### topic3

### 这里补充一下JS的操作符
