### postExcel
##### 需求：
- post请假发送数据到服务端成excel文件
- 客户端可下载文件

##### 问题：
- JQ Ajax $.ajax() dataType 参数设置问题
    参考《锋利的JQ》P189页
    dataType参数说明：预期服务器返回的数据类型，如果不指定（我指定错误时也是同样的情况），JQ将会自动根据HTTP包MIME信息返回responseXML或是responseText，并作为回调函数参数传递。
    可用类型：
    - xml
    - html
    - script
    - json
    - jsonp
    - text
