// 实现一个简单的观察者
const queuedObservers = new Set()
const observe = fn => queuedObservers.set(fn)
const observable = obj =>  new Proxy(obj, { set })

function set(target, keyProp, value, receiver) {
  const result = Reflect.set(target, keyProp, value, receiver)
  queuedObservers.forEach(callback => callback())
  return result 
}
// this 指向 -- 代理后指向了proxy
const target = new Date()
const handler = {}
const proxy = new Proxy(target, handler)

proxy.getDate(); // TypeError: this is not a Date object.

// 
const target = new Date('2015-01-01')
const handler = {
  get (target, keyProp, receiver) {
    if (keyProp === 'getDate') {
      return target.getDate.bind(target)
    }
    return Reflect.get(target, keyProp, receiver)
  }
}
const proxy = new Proxy(target, handler)

// Proxy 解决 class this 指向问题
function selfish(target) {
  const cache = new WeakMap()
  const handler = {
    get(target, key) {
      const value = Reflect.get(target, key)
      if (typeof value !== 'function') {
        return value
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(this))
      }
      return cache.get(value)
    },/*  */
  }
  const proxy = new Proxy(target, handler)
  return proxy
}
const logger = selfish(new Logger())