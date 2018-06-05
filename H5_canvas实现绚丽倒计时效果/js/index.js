/*
* @Author: linshuling
* @Date:   2018-06-01 09:29:22
* @Last Modified by:   linshuling
* @Last Modified time: 2018-06-05 11:13:36
*/
var page = {
    //全局参数设置
    data : {
        //canvas 宽度及高度
        WINDOW_WIDTH : 1024,
        WINDOW_HEIGHT: 768,

        //点阵小球的半径
        RADIUS : 8,

        //绘制数字的初始化位置
        MARFIN_LEFT : 30,
        MARGIN_TOP  : 60,

        //设置一个截止时间
        endTime : new Date(2018,5,6,18,47,34),

        //当前时间
        curShowTimeSeconds : 0
    },
    init : function(){
       this.draw('canvas');
    },
    //画布
    draw : function(id){
        var _this = this;

        var canvas = document.getElementById(id);
        var context = canvas.getContext('2d');

        canvas.width  = _this.data.WINDOW_WIDTH;
        canvas.height = _this.data.WINDOW_HEIGHT;

        if(context){
            _this.data.curShowTimeSeconds = _this.getCurrentShowTimeSeconds();
            setInterval(
                function(){
                    _this.render(context);
                    _this.updata();
                }
            ,50);
        }else{
            alert('您的浏览器不支持canvas')
        }
    },
    //时间更新
    updata : function(){
        var _this = this;
        var curShowTimeSeconds = _this.data.curShowTimeSeconds;
        var nextShowTimeSeconds = _this.getCurrentShowTimeSeconds();

        var nextHours   = parseInt(nextShowTimeSeconds / 3600);
        var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
        var nextSeconds = nextShowTimeSeconds % 60;

        var curHours   = parseInt(curShowTimeSeconds / 3600);
        var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
        var curSeconds = curShowTimeSeconds % 60;

        if(nextSeconds !== curSeconds){
            _this.data.curShowTimeSeconds = nextShowTimeSeconds;
        }

    },
    //当前时间到截止时间有多少秒
    getCurrentShowTimeSeconds : function(){
        var _this = this;
        var curTime = new Date();
        //毫秒
        var ret     = _this.data.endTime.getTime() - curTime.getTime();
        //秒
        ret = Math.round(ret/1000);

        return ret >= 0 ? ret : 0;
    },
    //绘制数字
    render : function(ctx){
        var _this = this;
        ctx.clearRect(0,0,_this.data.WINDOW_WIDTH, _this.data.WINDOW_HEIGHT);

        var RADIUS = _this.data.RADIUS;
        var curShowTimeSeconds = _this.data.curShowTimeSeconds;

        var hours   = parseInt(curShowTimeSeconds / 3600);
        var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
        var seconds = curShowTimeSeconds % 60;

        //小时
        _this.renderDigit(_this.data.MARFIN_LEFT,_this.data.MARGIN_TOP, parseInt(hours/10), ctx);
        _this.renderDigit(_this.data.MARFIN_LEFT + 15*(RADIUS+1),_this.data.MARGIN_TOP, parseInt(hours%10), ctx);
        _this.renderDigit(_this.data.MARFIN_LEFT + 30*(RADIUS+1),_this.data.MARGIN_TOP, 10, ctx);

        //分钟
        _this.renderDigit(_this.data.MARFIN_LEFT + 39*(RADIUS+1),_this.data.MARGIN_TOP, parseInt(minutes/10), ctx);
        _this.renderDigit(_this.data.MARFIN_LEFT + 54*(RADIUS+1),_this.data.MARGIN_TOP, parseInt(minutes%10), ctx);
        _this.renderDigit(_this.data.MARFIN_LEFT + 69*(RADIUS+1),_this.data.MARGIN_TOP, 10, ctx);

        //秒
        _this.renderDigit(_this.data.MARFIN_LEFT + 78*(RADIUS+1),_this.data.MARGIN_TOP, parseInt(seconds/10), ctx);
        _this.renderDigit(_this.data.MARFIN_LEFT + 93*(RADIUS+1),_this.data.MARGIN_TOP, parseInt(seconds%10), ctx);
    },
    //绘制数字点阵
    renderDigit : function(x, y, num, ctx){
        var _this = this;
        var RADIUS = _this.data.RADIUS;
        ctx.fillStyle = "rgb(0, 102, 153)";

        for(var i=0; i<digit[num].length; i++){
            for(var j=0; j<digit[num][i].length; j++){
                if(digit[num][i][j] === 1){
                    ctx.beginPath();
                    ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS, 0, 2*Math.PI);
                    ctx.closePath();
                    
                    ctx.fill();
                }
            }
        }
    }
}
window.onload = page.init();