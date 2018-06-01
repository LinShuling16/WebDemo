/*
* @Author: linshuling
* @Date:   2018-06-01 09:29:22
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-01 09:47:00
*/
var page = {
    init : function(){
       this.draw('canvas');
    },
    draw : function(id){
        var canvas = document.getElementById(id);
        var context = canvas.getContext('2d');
        if(context){
           context.moveTo(0, 0);
           context.lineTo(1024,768);

           context.stroke(); 
        }else{
            alert('您的浏览器不支持canvas')
        }
    },
}
window.onload = page.init();