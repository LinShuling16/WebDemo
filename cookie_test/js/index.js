/*
* @Author: linshuling
* @Date:   2018-01-17 15:19:33
* @Last Modified by:   linshuling
* @Last Modified time: 2018-01-18 18:48:13
*/
var page = {
    data : {},
    init : function(){
        this.onload();
    },
    onload : function(){
       this.bindEvent();
    },
    /*=========
        bindEvent用于绑定页面中的事件
    ========*/
    bindEvent : function(){
        var _this = this;
        //设置cookie
        $(document).on('click', '.btn', function(){
            _this.data.userInfo = {
                userId   : $('.user_id').val(),
                password : $('.password').val()
            }
            console.log(_this.data.userInfo);
            _this.setCookie('userId', _this.data.userInfo.userId, 1);
            _this.setCookie('password', _this.data.userInfo.password, 1);
        });
        //删除cookie
        $(document).on('click','.delCookieBtn', function(){
            _this.removeCookie('userId');
            _this.removeCookie('password');
        });
        //获取cookie的值 
        $(document).on('click', '.getCookieBtn',function(){
            var userId   = _this.getCooKie('userId'),
                password = _this.getCooKie('password');
            alert('The userId is : '+userId);
            alert('The password is : '+password);
        })
    },
    /*========
        以下是cookie相关操作
        setCookie    ：设置cookie 
        removeCookie : 删除cookie 
        getCooKie    : 获取cookie的值 
    ========*/
    /*===========
            如果不设置过期时间(day)，则表示这个cookie生命周期为浏览器会话期间，
        只要关闭浏览器窗口，cookie就消失了。这种生命期为浏览会话期的cookie被称为会话cookie。
        会话cookie一般不保存在硬盘上而是保存在内存里。 
        如果设置了过期时间，浏览器就会把cookie保存到硬盘上，关闭后再次打开浏览器，
        这些cookie依然有效直到超过设定的过期时间。 
　　    存储在硬盘上的cookie可以在不同的浏览器进程间共享，比如两个IE窗口。
        而对于保存在内存的cookie，不同的浏览器有不同的处理方式。
    ==========*/
    //设置cookie
    setCookie : function(key, value, day){
        var date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + value + ';expires=' + date;
    },
    //删除cookie
    removeCookie : function(key){
        this.setCookie(key, '', -1);//把Cookie保质期退回一天便可以删除
    },
    //获取cookie的值
    getCooKie : function(key){
        var cookieArr = document.cookie.split('; ');
        for(var i = 0; i < cookieArr.length; i++) {
            var arr = cookieArr[i].split('=');
            if(arr[0] === key) {
                return arr[1];
            }
        }
        return false;
    }
}

$(function(){
    page.init();
})