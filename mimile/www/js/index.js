	$(function(){

		$(".topnav").load("html/public-html/topnav.html");
		$(".top-bg-form").load("html/public-html/topnav-topbg.html");
		$("#footer").load("html/public-html/footer.html");
        $('.lunbo-bg').show();
        $(".category").css("margin-top","10px");
        $(".public-nav").css("border-bottom","2px solid #D4121B");
        $(".phone-five").css("top","287px");
        $(".phone-one").css("top","10px");
        if(getCookie('user1') && getCookie('pass1')){
            $("#log").css("display","none");
            $('#admin').css("display","block");
            $('#admin span').html(getCookie('user1')+'，你好');
        }
        $('#admin a').on('click',function(){
            $("#log").css("display","block");
            $('#admin').css("display","none");
        })
	/*-----------------------二级菜单---------------------*/

		$(".cgli").hover(function(){
			var $index = $(this).index();
            $(this).parents('.lunbo-content').find('.phone').eq($index).show().siblings('.phone').hide();
		},function(){
            $(".phone").hide();
        })
	
        /*----------------手风琴-----------------*/ 
        $(".mouth-li").hover(function(){
            $(".mouth-goods").find('dl').eq($(this).index()).stop().slideDown().parents('li').siblings().find('dl').stop().slideUp();
        })
        /*-------------上下方向的轮播------------*/
        var num03 = 0;
        var picnum03 = 12;
        var stop03 = true;
        $('.floor-right').click(function() {
            if (stop03) {
                num03--;
                tab3();
            }
            stop03 = false;
        });
        $('.floor-left').click(function() {
            if (stop03) {
                num03++;
                tab3();
            }
            stop03 = false;
        });

        function tab3() {
            $('.floor-lunbo ul').stop().animate({
               top: -50 * (num03 + 1) + 'px'
            }, 200, function() {
                if (parseInt($('.floor-lunbo ul').css('top')) == -50 * (picnum03 + 1)) {
                    $('.floor-lunbo ul').css('top', -50 + 'px');
                    num03 = 0;
                }
                if (parseInt($('.floor-lunbo ul').css('top')) == 0) {
                    $('.goods-g-lunbo').css('top', -50 * picnum03 + 'px');
                    num03 = 11;
                }
                stop03 = true;
            })
        }

        var timer = setInterval(function() {
            $('.floor-left').click();
        }, 2600)

        $('.floor-lunbo ul').hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(function() {
                $('.floor-left').click();
            }, 2600)
        })
    /*-------------banner左右轮播-------------*/
        var num = 0;
        var picnum = 6;
        var bstop = true;
        $('.banner-tab li').click(function() {
            if (bstop) {
                num = $(this).index();
                tab();
            }
            bstop = false;
        });
        $('.rightbox').click(function() {
            if (bstop) {
                num--;
                tab();
            }
            bstop = false;
        });
        $('.leftbox').click(function() {
            if (bstop) {
                num++;
                if (num == picnum) {
                    $('.banner-tab li').first().addClass('active').siblings('li').removeClass('active');
                }
                tab();
            }
            bstop = false;
        });

        function tab() {
            $('.banner-tab li').eq(num).addClass('active').siblings('li').removeClass('active');
            $('.banner-lunbo-image').stop().animate({
                left: -760 * (num + 1) + 'px'
            }, 200, function() {
                if (parseInt($('.banner-lunbo-image').css('left')) == -760 * (picnum + 1)) {
                    $('.banner-lunbo-image').css('left', -760 + 'px');
                    num = 0;
                }
                if (parseInt($('.banner-lunbo-image').css('left')) == 0) {
                    $('.banner-lunbo-image').css('left', -760 * picnum + 'px');
                    num = 5;
                }
                bstop = true;
            })
        }

        var timer = setInterval(function() {
            $('.leftbox').click();
        }, 2600)

        $('.banner-lunbo-image').hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(function() {
                $('.leftbox').click();
            }, 2600)
        })
    /*------------------左右轮播----------------*/
        var num02 = 0;
        var picnum02 = 4;
        var bstop02 = true;
        $('.goods-g-rightbox').click(function() {
            if (bstop02) {
                num02--;
                tab2();
            }
            bstop02 = false;
        });
        $('.goods-g-leftbox').click(function() {
            if (bstop02) {
                num02++;
                tab2();
            }
            bstop02 = false;
        });

        function tab2() {
            $('.goods-g-lunbo').stop().animate({
                left: -389 * (num02 + 1) + 'px'
            }, 200, function() {
                if (parseInt($('.goods-g-lunbo').css('left')) == -389 * (picnum02 + 1)) {
                    $('.goods-g-lunbo').css('left', -389 + 'px');
                    num02 = 0;
                }
                if (parseInt($('.goods-g-lunbo').css('left')) == 0) {
                    $('.goods-g-lunbo').css('left', -389 * picnum02 + 'px');
                    num02 = 3;
                }
                bstop02 = true;
            })
        }

        var timer = setInterval(function() {
            $('.goods-g-leftbox').click();
        }, 2600)

        $('.goods-g-lunbo').hover(function() {
            clearInterval(timer);
        }, function() {
            timer = setInterval(function() {
                $('.goods-g-leftbox').click();
            }, 1500)
        })

    });
    /*------------------json---------------*/
    $(function(){
        var bstop = true;
        $(window).on('scroll load', function() {
            var $scrolltop = $(window).scrollTop();//获取滚动距离
            var $height=$(window).height();//可视区
            var $top_home = $('.home-sale-pic').offset().top + 80;
            if ($top_home < $scrolltop + $height) {
                if (bstop) {
                    $.ajax({
                        url: 'json/index.json',
                        async:false,
                        beforeSend: function() {//发送请求前

                            $('.home-sale-pic li').html('<img src="img/bg/loading.gif" class="loading01 loading">');
                        }
                    }).done(function(data) {
                        var str01 = '';
                        for (var i = 0; i < data.pic_one.length; i++) {
                            str01 = '<a href="javascript:;"><img src="'+data.pic_one[i]+'"/></a>';
                            $('.home-sale-pic li').eq(i).html(str01);
                        }
                        bstop=false;

                    })
                }
            }

            var bstop02 = true;
            var $top_sale = $(".sale-big-pic").offset().top + 155;
            if ($top_sale < $scrolltop + $height) {
                if (bstop02) {
                    $.ajax({
                        url: 'json/index.json',
                        async:false,
                        beforeSend: function() {//发送请求前
                            $('.sale-big-pic li').html('<img src="img/bg/loading.gif" class="loading02 loading">');
                        }
                    }).done(function(data) {
                        var str02 = '';
                        for (var i = 0; i < data.pic_two.length; i++) {
                            str02 = '<a href="javascript:;"><img src="'+data.pic_two[i]+'"/></a>';
                            $('.sale-big-pic li').eq(i).html(str02);
                        }
                        bstop02=false;

                    })
                }
            }

            var stop03 = true;
            var $top_small = $(".sale-small-pic").offset().top + 60;
            if ($top_small < $scrolltop + $height) {
                if (stop03) {
                    $.ajax({
                        url: 'json/index.json',
                        async:false,
                        beforeSend: function() {//发送请求前
                            $('.sale-small-pic li').html('<img src="img/bg/loading.gif" class="loading03 loading">');
                        }
                    }).done(function(data) {
                        var str03 = '';
                        for (var i = 0; i < data.pic_three.length; i++) {
                            str03 = '<a href="javascript:;"><img src="'+data.pic_three[i]+'"/></a>';
                            $('.sale-small-pic li').eq(i).html(str03);
                        }
                        stop03=false;

                    })
                }
            }

            var bstop04 = true;
            var $top_item = $("div.item").offset().top + 90;
            if ($top_item < $scrolltop + $height) {
                if (bstop04) {
                    $.ajax({
                        url: 'json/index.json',
                        async:false,
                        beforeSend: function() {//发送请求前
                            $('div.item').html('<img src="img/bg/loading.gif" class="loading04 loading">');
                        }
                    }).done(function(data) {
                        var str04 = '';
                        for (var i = 0; i < data.pic_four.length; i++) {
                            str04 = '<a href="javascript:;"><img src="'+data.pic_four[i]+'"/></a>';
                            $('div.item').eq(i).html(str04);
                        }
                        bstop04=false;

                    })
                }
            }

            var bstop05 = true;
            var $top_group = $(".goods-group02").offset().top + 180;
            if ($top_group < $scrolltop + $height) {
                if (bstop05) {
                    $.ajax({
                        url: 'json/index.json',
                        async:false,
                        beforeSend: function() {//发送请求前
                            $('.goods-group02').html('<img src="img/bg/loading.gif" class="loading05 loading">');
                        }
                    }).done(function(data) {
                        var str05 = '';
                        for (var i = 0; i < data.pic_five.length; i++) {
                            str05 = '<a href="javascript:;"><img src="'+data.pic_five[i]+'"/></a>';
                            $('.goods-group02').eq(i).html(str05);
                        }
                        bstop05=false;

                    })
                }
            }

            var bstop06 = true;
            var $top_detail = $(".goods-detail").offset().top + 180;
            if ($top_detail < $scrolltop + $height) {
                if (bstop06) {
                    $.ajax({
                        url: 'json/index.json',
                        async:false,
                        beforeSend: function() {//发送请求前
                            $('.goods-detail').html('<img src="img/bg/loading.gif" class="loading06 loading">');
                        }
                    }).done(function(data) {
                        var str06 = '';
                        for (var i = 0; i < data.goods_layout.length; i++) {
                            str06 = '<dl><dt><a href="javascript:;"><img src="'+data.goods_layout[i].image+'"/></a></dt><dd><a href="javascript:;">'+data.goods_layout[i].title+'</a><span>'+data.goods_layout[i].nowPrice+'</span><del>'+data.goods_layout[i].prevPrice+'</del></dd></dl>';
                            $('.goods-detail').eq(i).html(str06);
                        }
                        bstop06=false;
                    })
                }  
            }

            var bstop07 = true;
            var $top_d = $(".recom-sto li").offset().top + 195;
            if ($top_d < $scrolltop + $height) {
                if (bstop07) {
                    $.ajax({
                        url: 'json/index.json',
                        async:false,
                        beforeSend: function() {//发送请求前
                            $('.recom-sto li').html('<img src="img/bg/loading.gif" class="loading06 loading">');
                        }
                    }).done(function(data) {
                        var str07 = '';
                        for (var i = 0; i < data.bigPic.length; i++) {
                            str07 = '<a href="html/detail.html"><img src="'+data.bigPic[i]+'"/></a>';
                            $('.recom-sto li').eq(i).html(str07);
                        }
                        bstop07=false;
                    })
                }  
            }


        });
        
    /*---------------------右侧边栏-------------------*/
    $(".side").hover(function(){
        $(this).find('a').stop(true).animate({
            left : -81
        },400)
    },function(){
        $(this).find('a').stop(true).animate({
            left : 40
        },400)
    })

    $(".side").hover(function(){
        $(this).find('p').stop(true).animate({
            left : -150
        },400)
    },function(){
        $(this).find('p').stop(true).animate({
            left : 40
        },600)
    })
});
