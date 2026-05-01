/**
 * Promise 版 AJAX 封装
 *
 * 参数：
 * method：请求方法，比如 "GET"
 * url：请求路径，比如 "/5.json"
 *
 * 返回值：
 * 返回一个 Promise 对象
 *
 * 成功：
 * 调用 resolve(request)
 *
 * 失败：
 * 调用 reject(request)
 */
function ajax(method, url) {
  return new Promise((resolve, reject) => {
    // 创建 XMLHttpRequest 请求对象
    const request = new XMLHttpRequest();

    // 配置请求方法和请求地址
    request.open(method, url);

    // 监听请求状态变化
    request.onreadystatechange = () => {
      // readyState === 4 表示请求完成
      if (request.readyState === 4) {
        // status 2xx 表示请求成功
        if (request.status >= 200 && request.status < 300) {
          // 成功时调用 resolve
          resolve(request);
        } else {
          // 失败时调用 reject
          reject(request);
        }
      }
    };

    // 发送请求
    request.send();
  });
}
let n = 1;

getPage.onclick = () => {
  ajax("GET", `/page${n + 1}`).then(
    request => {
      // 把服务器返回的 JSON 字符串转成数组
      const array = JSON.parse(request.response);

      // 找到页面里的 ul
      const list = document.querySelector("#xxx");

      // 如果没找到 ul，就停止执行
      if (!list) {
        console.error("没有找到 id 为 xxx 的 ul，请确认页面是通过 server.js 打开的");
        return;
      }

      // 遍历数组，创建 li
      array.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.id;
        list.appendChild(li);
      });

      // 页码加 1
      n += 1;
    },
    request => {
      alert("加载下一页失败，状态码：" + request.status);
    }
  );
};
getJSON.onclick = () => {
  ajax("GET", "/5.json").then(
    request => {
      console.log("解析前类型：", typeof request.response);
      console.log("解析前内容：", request.response);

      // 把 JSON 字符串转成 JS 数据
      const bool = JSON.parse(request.response);

      console.log("解析后类型：", typeof bool);
      console.log("解析后内容：", bool);
    },
    request => {
      alert("加载 JSON 失败，状态码：" + request.status);
    }
  );
};
getXML.onclick = () => {
  ajax("GET", "/4.xml").then(
    request => {
      // responseXML 会把 XML 字符串解析成 XML DOM
      const dom = request.responseXML;

      // 获取 warning 标签里的内容
      const text = dom.getElementsByTagName("warning")[0].textContent;

      console.log(text.trim());
    },
    request => {
      alert("加载 XML 失败，状态码：" + request.status);
    }
  );
};
getHTML.onclick = () => {
  ajax("GET", "/3.html").then(
    request => {
      // 创建 div 容器
      const div = document.createElement("div");

      // 把服务器返回的 HTML 字符串放进去
      div.innerHTML = request.response;

      // 插入页面
      document.body.appendChild(div);
    },
    request => {
      alert("加载 HTML 失败，状态码：" + request.status);
    }
  );
};
getJS.onclick = () => {
  ajax("GET", "/2.js").then(
    request => {
      // 创建 script 标签
      const script = document.createElement("script");

      // 把服务器返回的 JS 代码放进去
      script.innerHTML = request.response;

      // 插入 body 后，JS 会执行
      document.body.appendChild(script);
    },
    request => {
      alert("加载 JS 失败，状态码：" + request.status);
    }
  );
};
getCSS.onclick = () => {
  ajax("GET", "/style.css").then(
    request => {
      // 创建 style 标签
      const style = document.createElement("style");

      // 把服务器返回的 CSS 内容放进去
      style.innerHTML = request.response;

      // 插入 head，CSS 生效
      document.head.appendChild(style);
    },
    request => {
      alert("加载 CSS 失败，状态码：" + request.status);
    }
  );
};