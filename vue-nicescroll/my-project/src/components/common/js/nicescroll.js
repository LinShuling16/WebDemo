import $ from 'jquery'
import 'jquery.nicescroll'

export default function initScroll(els) {
  els.forEach((id) => {
    $(id).niceScroll({
      cursorcolor: '#ccc', // #CC0071 光标颜色
      cursoropacitymax: 1,  // 改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
      touchbehavior: false,  // 使光标拖动滚动像在台式电脑触摸设备
      cursorwidth: '5px',  // 像素光标的宽度
      cursorborder: '0',  //  游标边框css定义
      nativeparentscrolling: true,
      cursorborderradius: '5px', // 以像素为光标边界半径
      autohidemode: 'leave'  // 是否隐藏滚动条
    })
  })
}
