$(document).ready(function(){
	$(window).scroll(function(){
		if($(window).width()<768) return false;
		var s_height = $(window).scrollTop() + $(window).height();
		var c_height = $("header").height() + $(".search-wrap").height() + $(".dn-fix").height();
		var diff = s_height - c_height - 130;
		var limit = $(document).height() - $(".top-footer").height() - $(".bottom").height()-$("footer").height() - 20;
		if( diff >= 0 && s_height < limit){
			$(".dn-fix").css("top", diff + "px");
		} 
		if( diff < 0){
			$(".dn-fix").css("top", "0px");
		}
	});
	$(".menu-item").click(function(){
		$(window).scrollTop(0);
		return true;
	});
	$(".go-top").click(function(){
		$(window).scrollTop(0);
		return true;
	});
});