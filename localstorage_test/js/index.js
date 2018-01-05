/*
* @Author: linshuling
* @Date:   2018-01-05 14:47:14
* @Last Modified by:   linshuling
* @Last Modified time: 2018-01-05 17:34:12
*/
var page = {
    data : {},
    init : function(){
        this.onload();
    },
    onload : function(){
        this.bindEvent();
        this.unload();
        this.renderBeforeInfo(window.localStorage.getItem("userInfo"));
    },
    bindEvent : function(){
        var _this = this;
        //提交用户信息
        $(document).on('click', '.content .btn', function(){
            return;
        });
        //清除内容及localStorage内容
        $(document).on('click', '.content .clear_btn', function(){
            $('.user_id').val('');
            $('.user_name').val('');
            window.localStorage.clear();
        });
    },
    //使用localStorage存储本地数据(key,value)
    localStorage : function(key,value){
        var _this = this;
        if(window.localStorage){
            var storage = window.localStorage;
            if((value != 'undefined') && (value != '')){
                storage.setItem(key,value);
            }
        }else{
           alert("不支持localStorage");
        }
    },
    //获取localStrorage的数据信息渲染页面
    renderBeforeInfo : function(data){
        // var data = $.parseJSON(data);
        var data = JSON.parse(data);
        $('.user_id').val(data.userId);
        $('.user_name').val(data.userName);
    },
    //离开页面时存储信息
    unload :function(){
        var _this        = this;
        window.onunload  = function(){
            var userInfo = {
                userId      : $('.user_id').val(),
                userName    : $('.user_name').val()
            };
            //存储用户信息
            _this.data.userInfo = JSON.stringify(userInfo);
            _this.localStorage('userInfo', _this.data.userInfo);
        }
    }
}
$(function(){
    page.init();
})