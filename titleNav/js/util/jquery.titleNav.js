/**
 * @description 标题自动生成导航jQuery小插件
 * @author zhangxinxu(.com)
 * @version v1.0.0
 * @createtime 2018-04-27
 * @license MIT 可以复制和商用，但需要保留此段版权申明
 */


/**
 * 标题自动生成导航jQuery小插件
 * @param  Object options 可选参数
 * @return {[type]}         [description]
 */
$.fn.titleNav = function (options) {
	var defaults = {
		// 默认导航元素
		nav: null,
		// 滚动容器
		container: $(window),
		// fix定位时候距离顶部的高度
		offsetTop: 20
	};

	var params = $.extend({}, defaults, options || {});

	// 切换类名
	var ACTIVE = 'active';

	// 标题元素和导航元素
	var elTitles = $(this);
	var elNav = params.nav;
	// 滚动容器
	var elContainer = params.container;
	// 导航固定定位的偏移高度
	var offsetTop = params.offsetTop;

	if (!elContainer.length) {
		return elTitles;
	}

	var isContainerWindow = (elContainer[0] == window);

	if (!elNav) {
		elNav = $('<div class="title-nav-ul"></div>');
	}
	if (elNav.html() == '') {
		// 如果是空导航，自动创建
		elTitles.each(function () {
			var id = this.id;
			var href = id ? ('#' + id) : 'javascript:'
			elNav.append($('<a href="'+ href +'" class="title-nav-li">'+ this.innerHTML +'</a>').data('target', $(this)));
		});
	}

	// 导航append到页面中
	if (document.body.contains(elNav[0]) == false) {
		if (isContainerWindow) {
			$('body').append(elNav);
		} else {
			elContainer.append(elNav);
		}
	}
	// 偏移位置
	var defaultOffsetTop = elNav.offset().top;



	// 滚动行为
	elContainer.on('scroll', function () {
		var indexNav = 0;
		var rectTopContainer = isContainerWindow ? 0 : elContainer[0].getBoundingClientRect().top;
		// 目前滚动的高度
		var scrollTop = $(this).scrollTop();
		// 滚动到底部，一定是最后一个
		// 容器内部高度
		var scrollHeight = document.body.scrollHeight;
		if (!isContainerWindow) {
			scrollHeight = elContainer[0].scrollHeight;
		}
		if (elContainer.height() + scrollTop >= scrollHeight - 1) {
			indexNav = elTitles.length - 1;
		} else {
			// 遍历每个标题距离浏览器窗体上边缘的位置
			elTitles.each(function (index) {
				var distanceToTop = this.getBoundingClientRect().top - rectTopContainer;
				if (distanceToTop >= 0 || index === elTitles.length - 1) {
					indexNav = index;
					return false;
				}
			});
		}

		// 获取目前需要高亮的导航元素
		var elNavs = elNav.children();
		var elTargetNav = elNavs.eq(indexNav);
		if (elTargetNav.hasClass(ACTIVE) == false) {
			elNavs.removeClass(ACTIVE);
			elTargetNav.addClass(ACTIVE);
		}

		// 导航的fixed行为
		// 如果滚动足够多，固定定位
		if (scrollTop - defaultOffsetTop > -1 * offsetTop) {
			elNav.css({
				top: offsetTop,
				position: 'fixed'
			});
		} else {
			elNav.css({
				top: '',
				position: ''
			});
		}
	});

	// 导航点击行为
	elNav.on('click', 'a', function (event) {
		var href = $(this).attr('href');
		var target = $(this).data('target') || $(href);
		// 导航索引
		var indexNav = elNav.find('a').index($(this));
		if (!target.length) {
			target = elTitles.eq(indexNav);
		}
		if (/^#/.test(href)) {
			event.preventDefault();
		}

		var scrollHeight = document.body.scrollHeight;
		if (!isContainerWindow) {
			scrollHeight = elContainer[0].scrollHeight;
		}

		var rectTopContainer = isContainerWindow ? 0 : elContainer[0].getBoundingClientRect().top;
		var scrollTop = target.offset().top - rectTopContainer;
		// 一屏有多个标题，同时滚动到底部的处理
		if (scrollTop + elContainer.height() > scrollHeight - 2 && indexNav !== elNav.find('a').length - 1) {
			scrollTop = scrollHeight - elContainer.height() - 2;
		}

		var scrollContainer = isContainerWindow ? $('html, body') : elContainer;

		// 以动画方式滚动定位
		scrollContainer.animate({
			scrollTop: scrollTop
		});
	});

	elContainer.trigger('scroll');

	return elTitles;
};