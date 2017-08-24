$(function(){
	var iconH = $(".sprite").find("i").height(),
		triggerLi = $(".sprite").children("li");

	triggerLi.each(function(){
		var $this = $(this),
			$index = $this.index();

		$this.children("i").css("background-position","0 -" + iconH*$index+"px");

		$this.hover(function(){
			$this.children("i").css("background-position","-24px -" + iconH*$index+"px");
		},function(){
			$this.children("i").css("background-position","0 -" + iconH*$index+"px");
		})

	})

})