/*
* @Author: linshuling
* @Date:   2018-06-12 15:14:43
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-12 16:51:36
*/
// let exec = require("child_process").exec;

let start = (res,postData) =>{
    console.log("request handler 'start' was called.");

    let body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>nodeProDemo</title>
        </head>
        <body>
            <form action="/upload" method="post">
                <textarea name="text" cols="60" rows="20"></textarea>
                <br>
                <input type="submit" value="submit text">
            </form>
        </body>
        </html>
    `;
    // let body = '<!DOCTYPE html>'+
    //             '<html lang="en">'+
    //             '<head>'+
    //                 '<meta charset="UTF-8">'+
    //                 '<title>nodeProDemo</title>'+
    //             '</head>'+
    //             '<body>'+
    //                 '<form action="/upload" method="post">'+
    //                     '<textarea name="text" cols="60" rows="20"></textarea>'+
    //                     '<input type="submit" value="submit text">'+
    //                 '</form>'+
    //             '</body>'+
    //             '</html>';
    res.writeHead(200,{"Content-Type" : "text/html"});
    res.write(body);
    res.end();

    // exec("find", 
    //     {timeout:1000, maxBuffer:2000*1024},
    //     (error, stdout, stderr)=>{
    //     res.writeHead(200,{"Content-Type" : "text/plain"});
    //     res.write(stdout);
    //     res.end();
    // })
}

let upload = (res, postData) => {
    console.log("request handler 'upload' was called.");
    res.writeHead(200,{"Content-Type" : "text/plain"});
    res.write("You've sent:" + postData);
    res.end();
}

exports.start = start;
exports.upload = upload;