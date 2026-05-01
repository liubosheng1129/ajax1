// n 表示当前已经加载到了第几页
// 首页 page1 是 server.js 在返回 index.html 时直接插入的
let n = 1

// ==========================
// 1. 请求下一页 JSON 数据
// ==========================
getPage.onclick = () => {
  // 创建 AJAX 请求对象
  const request = new XMLHttpRequest()

  // 请求下一页
  // 第一次点击时 n = 1，所以请求 /page2
  // 第二次点击时 n = 2，所以请求 /page3
  request.open("GET", `/page${n + 1}`)

  // 监听请求状态变化
  request.onreadystatechange = () => {
    // readyState === 4 表示请求完成
    // status === 200 表示请求成功
    if (request.readyState === 4 && request.status === 200) {
      // 服务器返回的是 JSON 字符串
      // JSON.parse 把字符串转成 JS 数组
      const array = JSON.parse(request.response)

      // 遍历数组，把每个 item.id 添加到页面里
      array.forEach(item => {
        // 创建 li 标签
        const li = document.createElement("li")

        // 设置 li 的文本内容
        li.textContent = item.id

        // xxx 是 index.html 中 ul 的 id
        // server.js 生成的是 <ul id="xxx">...</ul>
        xxx.appendChild(li);
      })

      // 页码加 1
      n += 1
    }
  }

  // 发送请求
  request.send()
}

// ==========================
// 2. 请求 JSON
// ==========================
getJSON.onclick = () => {
  const request = new XMLHttpRequest()

  // 请求 5.json
  request.open("GET", "/5.json")

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      // request.response 默认是字符串
      console.log(typeof request.response)
      console.log(request.response)

      // 5.json 内容是 true
      // JSON.parse("true") 会得到布尔值 true
      const bool = JSON.parse(request.response)

      console.log(typeof bool)
      console.log(bool)
    }
  }

  request.send()
}

// ==========================
// 3. 请求 XML
// ==========================
getXML.onclick = () => {
  const request = new XMLHttpRequest()

  // 请求 XML 文件
  request.open("GET", "/4.xml")

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      // responseXML 会把 XML 响应解析成 DOM 对象
      const dom = request.responseXML

      // 获取第一个 warning 标签里的文字
      const text = dom.getElementsByTagName("warning")[0].textContent

      // trim 去掉前后空白和换行
      console.log(text.trim())
    }
  }

  request.send()
}

// ==========================
// 4. 请求 HTML 片段
// ==========================
getHTML.onclick = () => {
  const request = new XMLHttpRequest()

  // 注意：这里应该是 /3.html，不是 /3.htm
  request.open("GET", "/3.html")

  // onload 表示请求成功加载完成后执行
  request.onload = () => {
    // 创建一个 div
    const div = document.createElement("div")

    // 把服务器返回的 HTML 字符串放进 div
    div.innerHTML = request.response

    // 把 div 插入 body
    document.body.appendChild(div)
  }

  // 请求失败时执行，目前没有写具体逻辑
  request.onerror = () => {
    alert("请求 HTML 失败")
  }

  request.send()
}

// ==========================
// 5. 请求 JS 文件
// ==========================
getJS.onclick = () => {
  const request = new XMLHttpRequest()

  // 请求 2.js
  request.open("GET", "/2.js")

  request.onload = () => {
    // 创建 script 标签
    const script = document.createElement("script")

    // 把服务器返回的 JS 代码放入 script
    script.innerHTML = request.response

    // 插入 body 后，JS 会被浏览器执行
    document.body.appendChild(script)
  }

  request.onerror = () => {
    alert("请求 JS 失败")
  }

  request.send()
}

// ==========================
// 6. 请求 CSS 文件
// ==========================
getCSS.onclick = () => {
  const request = new XMLHttpRequest()

  // 配置请求方法和路径
  // open 执行后，readyState 会变成 1
  request.open("GET", "/style.css")

  // 监听请求状态变化
  request.onreadystatechange = () => {
    console.log(request.readyState)

    // readyState === 4 表示下载完成
    // 但下载完成不一定成功，所以还要判断 status
    if (request.readyState === 4) {
      // 2xx 表示成功
      if (request.status >= 200 && request.status < 300) {
        // 创建 style 标签
        const style = document.createElement("style")

        // 把服务器返回的 CSS 放进 style 标签
        style.innerHTML = request.response

        // 插入 head，CSS 生效
        document.head.appendChild(style)
      } else {
        alert("加载 CSS 失败")
      }
    }
  }

  // 发送请求
  // send 后，浏览器才真正开始发请求
  request.send()
}