// 封装一个Ajax
const getJSON = url => {
  return new Promise((res, rej) => {
    const handler = function() {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        res(this.response)
      } else {
        rej(new Error(this.statusText))
      }
    }
    const XHR = new XMLHttpRequest()
    XHR.open("GET", url)
    XHR.onreadystatechange = handler
    XHR.responseType = "JSON"
    XHR.setRequestHeader("Accept", "application/json")
    XHR.send()
  })
}

