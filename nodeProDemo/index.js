/*
* @Author: linshuling
* @Date:   2018-06-12 13:57:23
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-12 15:30:33
*/
let server = require('./server');
let router = require('./router');
let requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);