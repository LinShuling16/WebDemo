/*
* @Author: linshuling
* @Date:   2018-06-12 13:57:34
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-12 16:58:05
*/

/*
    注意：Node.js是单线程的，它通过事件轮询来实现并行操作。
 */

//请求Node.js自带的http模块，并把它赋值给http变量。

let http = require('http');
let url  = require('url');

/*

    调用http模块提供的createServer函数，
    createServer函数返回一个对象，这个对象有listen的方法，
    listen方法的参数用来指定这个HTTP服务监听的端口号。

    createServer函数接收唯一一个参数，该参数是一个函数。
    这里我们想createServer()函数传入了一个匿名函数(这里使用ES6的箭头函数的写法。)

    注意这里的理解：
    （1）NodeJS是事件驱动的。
    （2）回调。

    注意：
    当我们在服务器访问网页时，我们的服务器可能会输出两次“Request received.”
    那是因为大部分浏览器都会在你访问 http://localhost:8888/ 
    时尝试读取 http://localhost:8888/favicon.ico。

    我们的代码就是：当收到请求时，使用 response.writeHead() 
    函数发送一个HTTP状态200和HTTP头的内容类型（content-type），
    使用 response.write() 函数在HTTP相应主体中发送文本“Hello"。
*/

function start(route, handle, postData){
    http.createServer( (req,res) => {
        console.log("Request received.");

        let psotData = "";
        let pathname = url.parse(req.url).pathname;
        console.log("Request for " + pathname + " received.");

        req.setEncoding("utf8");

        req.addListener("data", (postDataChunk)=>{
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        })

        req.addListener("end", ()=>{
            route(handle, pathname, res, postData);
        })


    }).listen(8888);

    console.log("Server has stared.");
}

exports.start = start;

