/*
* @Author: linshuling
* @Date:   2018-06-12 13:57:23
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-13 09:30:36
*/
let server = require('./server');
let router = require('./router');
let requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

server.start(router.route, handle);