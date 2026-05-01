// 引入 Node.js 内置 http 模块
// 作用：创建 HTTP 服务器
var http = require('http')
// 引入 Node.js 内置 fs 模块
// fs = file system，作用：读取本地文件
var fs = require('fs')
// 引入 Node.js 内置 url 模块
// 作用：解析浏览器请求的 URL
var url = require('url')
// 获取命令行传入的端口号
// 例如运行：node server.js 8888
// 那么 process.argv[2] 就是 8888
var port = process.argv[2]
// 如果没有传端口号，就提示用户并退出程序
if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

// 创建服务器
// 每当浏览器发来一次请求，这个回调函数就会执行一次
var server = http.createServer(function(request, response){
    // 解析请求地址
  // 例如：/index.html?name=jack
var parsedUrl = url.parse(request.url, true)

  // request.url 是浏览器请求的完整路径，包含查询参数
  // 例如：/index.html?name=jack
  var pathWithQuery = request.url

  // queryString 用来保存 ? 后面的查询字符串
  var queryString = ''

  // 如果请求路径里包含 ?，说明有查询参数
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }

  // pathname 是不带查询参数的路径
  // 例如 /index.html?name=jack 的 pathname 是 /index.html
  var path = parsedUrl.pathname

  // query 是查询参数对象
  // 例如 /index.html?name=jack 得到 { name: 'jack' }
  var query = parsedUrl.query

  // 请求方法，常见有 GET、POST
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  // ==========================
  // 1. 处理首页 /index.html
  // ==========================
  if (path === '/index.html') {
    // 设置状态码 200，表示请求成功
    response.statusCode = 200

    // 告诉浏览器：返回的是 HTML，并且编码是 utf-8
    response.setHeader('Content-Type', 'text/html;charset=utf-8')

    // 读取 public/index.html
    let string = fs.readFileSync('public/index.html').toString()

    // 读取第一页 JSON 数据
    const page1 = fs.readFileSync('db/page1.json').toString()
   
    // 把 JSON 字符串转成 JavaScript 数组
    const array = JSON.parse(page1)

    // 把数组里的每个对象转成 li 字符串
    // 例如 {id: 1} 变成 <li>1</li>
    const result = array.map(item => `<li>${item.id}</li>`).join('')

    // 把 index.html 中的 {{page1}} 替换成真正的 ul 列表
    string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`)

    // 把处理好的 HTML 返回给浏览器
    response.write(string)

    // 结束响应
    response.end()

  // ==========================
  // 2. 处理 /main.js
  // ==========================
  } else if (path === '/main.js') {
    response.statusCode = 200

    // 告诉浏览器：返回的是 JavaScript
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')

    // 读取并返回 public/main.js
    response.write(fs.readFileSync('public/main.js'))
    response.end()

  // ==========================
  // 3. 处理 /style.css 或 /2.css
  // ==========================
  } else if (path === '/style.css' || path === '/2.css') {
    response.statusCode = 200

    // 告诉浏览器：返回的是 CSS
    response.setHeader('Content-Type', 'text/css;charset=utf-8')

    // 读取并返回 CSS 文件
    response.write(fs.readFileSync('public/style.css'))
    response.end()

  // ==========================
  // 4. 处理 /2.js
  // ==========================
  } else if (path === '/2.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')

    // 返回 public/2.js
    response.write(fs.readFileSync('public/2.js'))
    response.end()

  // ==========================
  // 5. 处理 /3.html
  // ==========================
  } else if (path === '/3.html') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')

    // 返回 HTML 片段
    response.write(fs.readFileSync('public/3.html'))
    response.end()

  // ==========================
  // 6. 处理 /4.xml
  // ==========================
  } else if (path === '/4.xml') {
    response.statusCode = 200

    // 告诉浏览器：返回的是 XML
    response.setHeader('Content-Type', 'text/xml;charset=utf-8')

    response.write(fs.readFileSync('public/4.xml'))
    response.end()

  // ==========================
  // 7. 处理 /5.json
  // ==========================
  } else if (path === '/5.json') {
    response.statusCode = 200

    // JSON 推荐写 application/json
    // 你原来写 text/json 也能用，但 application/json 更标准
    response.setHeader('Content-Type', 'application/json;charset=utf-8')

    response.write(fs.readFileSync('public/5.json'))
    response.end()

  // ==========================
  // 8. 处理 /page2
  // ==========================
  } else if (path === '/page2') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json;charset=utf-8')

    // 返回第二页数据
    response.write(fs.readFileSync('db/page2.json'))
    response.end()

  // ==========================
  // 9. 处理 /page3
  // ==========================
  } else if (path === '/page3') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'application/json;charset=utf-8')

    // 返回第三页数据
    response.write(fs.readFileSync('db/page3.json'))
    response.end()

  // ==========================
  // 10. 其他路径全部 404
  // ==========================
  } else {
    // 404 表示资源不存在
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')

    response.write('你输入的路径不存在对应的内容')
    response.end()
  }
})

// 服务器开始监听指定端口
server.listen(port)

console.log('监听 ' + port + ' 成功')
console.log('请打开：http://localhost:' + port + '/index.html')