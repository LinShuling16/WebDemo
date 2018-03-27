/*
* @Author: linshuling
* @Date:   2018-03-27 15:50:46
* @Last Modified by:   linshuling
* @Last Modified time: 2018-03-27 16:45:29
*/
var page  = {
    data : {},
    init : function(){
         var $slider = $('.banner').unslider({
            speed: 500,               //  每张幻灯片动画的速度（以毫秒为单位）
            delay: 3000,              //  幻灯片动画之间的延迟（以毫秒为单位）
            complete: function() {},  //  在每个幻灯片动画之后调用的函数
            keys: true,               //  启用键盘（左，右）箭头快捷键
            dots: true,               //  显示点导航
            fluid: false              //  支持响应式设计。 可能打破无响应的设计
        });
        // 前一张和后一张操作的事件绑定
        $('.banner-con .banner-arrow').click(function(){
            var forward = $(this).hasClass('prev') ? 'prev' : 'next';
            $slider.data('unslider')[forward]();
        });
    },
}
$(function(){
    page.init();
})