/*
* @Author: linshuling
* @Date:   2018-02-01 11:27:29
* @Last Modified by:   linshuling
* @Last Modified time: 2018-02-01 15:32:50
*/
var page = {
    data : {},
    init : function(){
        this.onload();
    },
    onload : function(){
        this.bindEvent();
        console.log(history.length);
    },
    bindEvent : function(){
        var toStep1 = this.getIdDOM('toStep1'),
            toStep2 = this.getIdDOM('toStep2'),
            toStep3 = this.getIdDOM('toStep3'),
            toEntry = this.getIdDOM('toEntry');
        //entry.html ——> step1.html
        if(toStep1){
            toStep1.onclick = function(){
                 window.location.href = './step1.html';
            }
        }
        //step1.html ——> step2.html
        if(toStep2){
            toStep2.onclick = function(){
                window.location.href = './step2.html';
            }
        }
        //step2.html ——> step3.html
        if(toStep3){
            toStep3.onclick = function(){
                window.location.href = './step3.html';
            }
        }
        //step3.html ——> entry.html
        if(toEntry){
            toEntry.onclick = function(){
                /*============
                    浏览器的history API支持负数让我们返回指定索引的历史页
                    2种实现方法
                ============*/
                //1.有这么一种情况：在浏览器的地址栏输入要访问的地址，此时entry不是第一页，而是第二页。
                //所以得知道从entry后要前进多少页(这里是3)
                history.go(-3);
                //2.必须确保entry是第一页
                // history.go(-(history.length-1));
            }
        }
    },
    /*======
        判断页面中是否存在相应的id节点，存在返回该节点，不存在返回false
        这里使用原生的JS，在四个不同的页面中引用一个js脚本——index.js,需要对
        绑定了onclick事件的DOM是否存在做一下判断，否则会报错：Cannot set property 'onclick' of null。
    =====*/
    getIdDOM : function(id){
        var idDOM = document.getElementById(id);
        return idDOM ? idDOM :false;
    },
}
window.onload = function(){
    page.init();
}