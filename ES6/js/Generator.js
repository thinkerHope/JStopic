// (1) 一个抽奖的小栗子
// 还避免了变量被全局污染
function draw(count) {
  // 执行一段抽奖逻辑
  // ...
  console.log(`剩余${count}次`)
}

// 执行抽奖的方法
function* remain(count) {
  while(count > 0) {
    count--
    yield draw(count)
  }
}

let startDrawing = remain(6)

let btn = document.createElement('button')
btn.id = 'start'
btn.textContent = '开始抽奖'
document.body.appendChild(btn)

document.getElementById('start').addEventListener('click', function(){
  startDrawing.next()
}, false);

// (2)实现长轮询(除此还有Websocket), 
// 实现实时把服务器数据更新到客户端

// 模拟一个请求
function* ajax() {
  yield new Promise((resolve, reject) => {
    // 此处用一个定时器来模拟请求数据的耗时，并约定当返回的json中code为0表示有新数据更新
    setTimeout(() => {
      resolve({code: 0})
    }, 200)
  })
}

function update() {
  let promise = ajax().next().value;
  promise.then(res => {
    if(res.code !== 0) {
      setTimeout(() => {
        console.log("2秒后继续查询...")
        update();
      }, 2000);
    } else {
      console.log(res);
    }
  });
}

update();

// (3)部署ajax, 实现同步
// 异步函数的同步表达
function* main() {
  let result = yield request("http://some.url");
  let resp = JSON.parse(result);
  console.log(resp.value)
}

let it = main();
it.next();

function request(url) {
  axio({
    // ...
  }).then(res => {
    it.next(res.data);    
  });
}

// 部署iterator接口
const o1 = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]: function* () {
    for(let key in this) {
      yield this[key];
    }
  }
}