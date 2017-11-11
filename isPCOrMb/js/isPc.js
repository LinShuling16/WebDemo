/*
* @Author: linshuling
* @Date:   2017-11-10 17:11:00
* @Last Modified by:   linshuling
* @Last Modified time: 2017-11-11 09:36:03
*/
$(function(){
    var isPC=IsPC();
    if(isPC){
        $.getScript("./js/pc.js",function(){  //加载pc.js,成功后，并执行回调函数
              console.log("加载js文件");
            });
    }
    else{
        $.getScript("./js/mb.js",function(){  //加载mobile.js,成功后，并执行回调函数
              console.log("加载js文件");
            });
    }

})
 function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
};