// 用发布-订阅模式实现类似自定义数据的双向绑定
// 订阅者Watcher
/*
  * el    指令对应的DOM元素
  * vm    指令所属myVue实例
  * exp   指令对应的值，本例如"myText"
  * type  绑定的属性值，本例为"innerHTML"
  * */
class Watcher {
  constructor(el, vm, exp, type) {
    this.el = el
    this.vm = vm
    this.exp = exp
    this.type = type

    this._update()
  }

  _update() {
    this.el.setAttribute(type, this.vm.$data.exp)
  }
}
// 创建一个类
class myValue {
  constructor(options) {
    const { data: $data, elId: $elId } = options
    this._directives = {}

    this._compile($elId)
    this._obverse($data)
  }
  // 解析模板指令，绑定监听函数
  _compile(el) {
    const can = typeof el === 'object' ? el : document.querySelector(el)
    const nodes = can.childNodes
    const len = nodes.length
    const _vm = this
    const _dirs = this._directives
    for (let i = 0; i < len; i++) {
      let node = nodes[i]
      if (node.childNodes.length !== 0) _compile(node)

      if (node.hasAttribute('v-text')) {
        const attr = node.getAttribute('v-text')
        _dirs[attr].push(new Watcher(node, _vm, attr, 'innerHTML'))
      }
      if (node.hasAttribute('v-model') && (node.tagName === "INPUT" || node.tagName === "TEXTAREA")) {
        const attr = node.getAttribute('v-model')
        _dirs[attr].push(new Watcher(node, _vm, attr, 'value'))
        node.addEventLisentener('change', function(e) {
          _vm.$data[attr] = e.target.value
        }, false)
      }
    }
  }
  // 劫持数据，监听数据
  _obverse(data) {
    // 作用域问题待研究
    let val
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
         if (typeof data[key] === 'Object') _obverse(data[key])
         val = data[key]

         this._directives[key] = []
         Object.defineProperty(data, key, {
           enumerable: true,
           configurable: true,
           get: function() {
             return val
           },
           set: function(newVal) {
             if (newVal !== val) {
               val = newVal
               _directives[key].forEach(item => item._updata())
             }
           },
         })
      }
    }
  }
}

const options = {
  el: '#app',
  data: {
    myText: 'Hello World',
  },
}
const app = new myValue(options)



// 补充一个let作用域的知识点
function createFunctionArray() {
  arr = [];
  for(var i = 0; i < 5; i++){
      arr[i] = function () {
          console.log(i);
      }
  }
  return arr;
}
// arr里的函数输出都是4
function createFunctionArray() {
  arr = [];
  for(let i = 0; i < 5; i++){
      arr[i] = function () {
          console.log(i);
      }
  }
  return arr;
}
// 就能正常输出了
