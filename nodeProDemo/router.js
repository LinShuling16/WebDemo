/*
* @Author: linshuling
* @Date:   2018-06-12 14:41:22
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-13 10:07:00
*/
/*
    路由-针对不同的URL有不同的处理方法。
 */
let route = (handle, pathname, res, req) =>{
    console.log("About to route a request for" + pathname);
    if(typeof handle[pathname] === 'function'){
        handle[pathname](res, req);
    }else{
        console.log("No request handle found for " + pathname);
        res.writeHead(404,{"Content-Type" : "text/plain"});
        res.write("404 Not found");
        res.end();
    }
}
exports.route = route;