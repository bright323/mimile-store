$(function(){
	$(".d-topnav").load("public-html/topnav.html");
	$(".d-topnav-topbg").load("public-html/topnav-topbg.html");
	$(".d-nav").load("public-html/nav.html");
	$("#de-footer").load("public-html/footer02.html");

	/*----------------scroll---------------*/
	/*$(window).scroll(function(){
		if($(this).scrollTop() >= $(".r-list").offset().top){
			$(".r-list").addClass("r-list-fixed");
		}else{
			$(".r-list").removeClass("r-list-fixed");
		}
	})*/

	/*----------------tab-----------------*/
	/*-------商品详情--------*/
	$(".r-list li").on("click",function(){
		var $index = $(this).index();
		$(this).css({
			backgroundColor:"white",
			border:"1px solid #ddd",
			borderBottom:0
		}).siblings('li').css({
			backgroundColor:"#f5f5f5",
			border:0
		})
		$(this).parent().siblings('div').eq($index).css("display","block").siblings('div').css("display","none");
	})

	/*--------评价--------*/
	$(".tab3-box li").on("click",function(){
		var $index = $(this).index();
		$(this).css({
			backgroundColor:"white",
			border:"1px solid #ddd",
			borderBottom:0
		}).siblings('li').css({
			backgroundColor:"#f5f5f5",
			border:0
		})
	})


})