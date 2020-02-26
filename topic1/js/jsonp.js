const jsonp = function (url, data, callback) {
  const URL = url.indexOf('?') === -1 ? `${url}?` : url
  const funcName = `my_func-${Math.random().toString().replace('.', '')}`
  const urlStr =  Object.keys(data).reduce(
    (pre, cur) => `${pre}&${cur}=${data[cur]}`,
    `${URL}callback=${funcName}`
  )

  window[funcName] = function (data) {
    callback(data)
    document.body.removeChild('script')
  }
  const scriptEle = document.createElement('script')
  scriptEle.src = URL

  document.body.appendChild(scriptEle)
}

window.jsonp$ = jsonp