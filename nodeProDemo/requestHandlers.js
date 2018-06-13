/*
* @Author: linshuling
* @Date:   2018-06-12 15:14:43
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-13 10:26:14
*/
// let exec = require("child_process").exec;

let querystring = require("querystring");
let fs = require("fs");
let formidable = require("formidable");

let start = (res,postData) =>{
    console.log("request handler 'start' was called.");

    let body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>nodeProDemo</title>
        </head>
        <body>
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="upload"  multiple="multiple">
                <br>
                <input type="submit" value="Upload file">
            </form>
        </body>
        </html>
    `;
    res.writeHead(200,{"Content-Type" : "text/html"});
    res.write(body);
    res.end();

}

let upload = (res, req) => {
    console.log("request handler 'upload' was called.");

    let form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(req, (error, fields, files) =>{
        console.log("parsing done");
        fs.renameSync(files.upload.path, "./tmp/test.jpg");
        res.writeHead(200,{"Content-Type":"text/html"});
        res.write("received image:<br>");
        res.write("<img src='/show'/>");
        res.end();
    });
}

let show = (res) =>{
    console.log("Request handler 'show' was called");
    fs.readFile("./tmp/test.jpg", "binary", (error, file)=>{
        if(error){
            res.writeHead(500,{"Content-Type":"text/plain"});
            res.write(error + "\n");
            res.end();
        }else{
            res.writeHead(200,{"Content-Type" : "image/jpg"});
            res.write(file, "binary");
            res.end();
        }
    });
}
exports.start = start;
exports.upload = upload;
exports.show = show;