$(function(){
	$(".d-topnav").load("public-html/topnav.html");
	$(".d-topnav-topbg").load("public-html/topnav-topbg.html");
	$(".d-nav").load("public-html/nav.html");
	$("#de-footer").load("public-html/footer02.html");

	/*----------------二级菜单-----------------*/
	$(".nav-title").hover(function(){
		$('.lunbo-bg').show()

	},function(){
		$(".lunbo-bg").hide();
	})

	$(".cgli").hover(function(){
			var $index = $(this).index();
            $(this).parents('.lunbo-content').find('.phone').eq($index).show().siblings('.phone').hide();
		},function(){
            $(".phone").hide()
    })



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

	/*----------------放大镜-----------------*/
	$("#lpic").hover(function(){
		$("#rpic").css("display","block");
		$(".fd").css("display","block");
	},function(){
		$("#rpic").css("display","none");
		$(".fd").css("display","none");
	});
	$('#lpic').mousemove(function(ev){

		var ev = ev || window.event;
		var l = $("#lpic").offset().left;
		var t = $("#lpic").offset().top;
		var x = ev.pageX;
		var y = ev.pageY;
		var minX = $(".fd").width()/2 + l;
		var maxX = $("#lpic").width() - $(".fd").width()/2 + l;
		if(x <= minX){
			x = minX;
		}else if(x >= maxX){
			x = maxX;
		}
		
		if(y<t+$('.fd').height()/2){
			y=t+$('.fd').height()/2;
		}else if(y>t+$("#lpic").height()-$('.fd').height()/2){
			y=t+$("#lpic").height()-$('.fd').height()/2
		}
		var fx = x - $(".fd").width()/2 - l + "px";
		var fy = y - $(".fd").height()/2 - t + "px";
		$(".fd").css("left", fx);
		$(".fd").css("top", fy);
		var proportionX = $(".fd").width() / $("#lpic").width();
		var proportionY = $(".fd").height() / $("#lpic").height();
		var proX = -proportionX * ($(".fd").offset().left-100);
		var proY = -proportionY * ($(".fd").offset().top-200);
		$("#rpic").find("img").css("left",proX);
		$("#rpic").find("img").css("top",proY);

		var arr = ["../img/detail (12).jpg","../img/detail (14).jpg","../img/detail (16).jpg","../img/detail (18).jpg","../img/detail (20).jpg","../img/detail (12).jpg"];
		$("#bpic li").mouseover(function(){
			$("#lpic img").attr("src",arr[$(this).index()]);
			$("#rpic").find("img").attr("src",arr[$(this).index()]);
		})

		
		var num = 0;
		var group = 0;
		$(".lbackground").click(function(){
			$(".lbackground").css('cursor','pointer');
			tab();
			$(".lbackground").css('cursor','no-drop');
		})
		$(".rbackground").click(function(){
			num++;
			$(".rbackground").css('cursor','pointer');
			tab();
			$(".rbackground").css('cursor','no-drop');
		})
		function tab(){
			$("#box ul").stop().animate({
				left: -64*num + 'px'
			},500);
		}
	})
		
})