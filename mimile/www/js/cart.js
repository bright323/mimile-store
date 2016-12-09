$(function(){
	$("#header").load("public-html/topnav.html");
	$("#cart-footer").load("public-html/footer02.html");
    $(".blank-cart").show();
	if(getCookie('cartsid')==''){
		$(".add-cart").css("display","none");
		$(".next-foot-box").css("display","none");
		$(".blank-cart").css("display","block");
	}else{
		$(".add-cart").css("display","block");
		$(".next-foot-box").css("display","block");
		$(".blank-cart").css("display","none");
	}

//获取数据
$.ajax({
    url: '../json/cart.json',
    async:false,
    success: function(data) {
        for (var i = 0; i < data.piclist.length; i++) {
            $('.cart-content img').eq(i).attr('src', data.piclist[i].img);
            $('.cart-content img').eq(i).attr('sid', data.piclist[i].sid);
            $('.g-details').eq(i).html(data.piclist[i].title);
            $('.cart-content dd p').eq(i).html(data.piclist[i].price);
        }
        if (getCookie('cartsid')) {
            var s = getCookie('cartsid').split(',');
            var n = getCookie('cartnum').split(',');
            for (var i = 0; i < s.length; i++) {
                createcart(s[i], n[i]);
            }
        }
    }
})


function cookiearr() { 
    if (getCookie('cartsid')) {
        sidarr = getCookie('cartsid').split(',');
    } else {
        sidarr = [];
    }
    if (getCookie('cartnum')) {
        numarr = getCookie('cartnum').split(',');
    } else {
        numarr = []
    }
}
var sidarr = [];
var numarr = [];

$('.add-to-cart').on('click', function() {
    cookiearr();
    var sid = $(this).parents('dl').find('dt').find('img').attr('sid');
    if ($.inArray(sid, sidarr) != -1) {
        $('.cart-goods-box:visible').each(function() {
            if (sid == $(this).find('.cart-goods-img').find('img').attr('sid')) {
                var $value = $(this).find('.cart-goods-value').val();
                $value++;
                $(this).find('.cart-goods-value').val($value);
                numarr[sidarr.indexOf(sid)] = $value;
                var dj = parseFloat($(this).find('.cart-goods-money').html());
                $(this).find('.cart-goods-alc').html((dj * $value).toFixed(2));
                addCookie('cartnum', numarr.toString(), 7);
            }
        });
    } else {
        sidarr.push(sid);
        addCookie('cartsid', sidarr.toString(), 7);
        numarr.push(1);
        addCookie('cartnum', numarr.toString(), 7);
        createcart(sid, 1);
    }
    if(getCookie('cartsid')==''){
		$(".add-cart").css("display","none");
		$(".next-foot-box").css("display","none");
		$(".blank-cart").css("display","block");
	}else{
		$(".add-cart").css("display","block");
		$(".next-foot-box").css("display","block");
		$(".blank-cart").css("display","none");
	}
});

function createcart(sid, num) {
    $.ajax({
        url: '../json/cart.json',
        async:false,
        success: function(data) {
            for (var i = 0; i < data.piclist.length; i++) {
                if (sid == data.piclist[i].sid) {
                    var $clone = $('.cart-goods-box:hidden').clone(true);
                    $clone.find('img').attr('src', data.piclist[i].img);
                    $clone.find('img').attr('sid', data.piclist[i].sid);
                    $clone.find('.cart-goods-details').html(data.piclist[i].title);
                    $clone.find('.cart-goods-money').html(data.piclist[i].price);
                    $clone.find('.cart-goods-value').val(num);
                    var singleprice = parseFloat($clone.find('.cart-goods-money').html());
                    var count = parseInt($clone.find('.cart-goods-value').val());
                    $clone.find('.cart-goods-alc').html((singleprice * count).toFixed(2));
                    $clone.css('display', 'block');
                    $('.addgoods').append($clone);
                    $('.addgoods').addClass('cl');
                }
            }
        }
    })
}

function deletegood(sid1, array) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        if (sid1 != array[i]) {
            arr.push(array[i]);
        }
    }
    numarr.splice(sidarr.indexOf(sid1), 1);
    sidarr = arr;
    addCookie('cartsid', sidarr.toString(), 7);
    addCookie('cartnum', numarr.toString(), 7);
}


$('.cart-del').on('click', function() {
    cookiearr();
    $(this).parents('.cart-goods-box').remove();
    deletegood($(this).parents('.cart-goods-box').find('img').attr('sid'), sidarr);
    totalprice();
     if($(".cart-goods-box:visible").length == 0){
		$(".add-cart").css("display","none");
		$(".next-foot-box").css("display","none");
		$(".blank-cart").css("display","block");
	}else{
		$(".add-cart").css("display","block");
		$(".next-foot-box").css("display","block");
		$(".blank-cart").css("display","none");
	}
});



$('.add-to-cart').on('click', function() {
    cookiearr();
    $('.cart-goods-box:visible').each(function() {
        if ($(this).find('input:checkbox').is(':checked')) {
            $(this).remove();
            deletegood($(this).find('img').attr('sid'), numarr);
        }
    });
    totalprice();
})

//统计总价格
function totalprice(){
    var $total=0;
    $('.cart-goods-box:visible').each(function(){
        if($(this).find('.cart-goods-check').is(':checked')){
            $total+=parseFloat($(this).find('.cart-goods-alc').html());
        }
    })
    $('.allgoods-money span').html($total.toFixed(2));
}

//按钮的全选
$('.cart-all-selected').on('change',function(){
    if($(this).prop('checked')){
        $('.cart-goods-box:visible :checkbox').prop('checked',true);
    }else{
        $('.cart-goods-box:visible :checkbox').prop('checked',false);
    }
    totalprice()
})

var $input=$('.cart-goods-box:visible :checkbox');

$input.on('click',function(){
    if($('.cart-goods-box:visible input:checked').length==$input.size()){
        $('.cart-all-selected').prop('checked',true);
    }else{
        $('.cart-all-selected').prop('checked',false);
    }
    totalprice()
});

//改变购买数量
//计算小计
function smalltotal(row){
    var $dprice=parseFloat(row.parents('.cart-goods-box').find('.cart-goods-money').html());
    var $dnum=parseInt(row.parents('.cart-goods-box').find('.cart-goods-value').val());
    return ($dprice*$dnum).toFixed(2);
}

$('.cart-goods-value').next().on('click',function(){
    var $buynum=parseInt($(this).prev('input').val());
    $buynum++;
    if($buynum>=99){
        $(this).prev('input').val(99);
    }else{
        $(this).prev('input').val($buynum);
    }
    $(this).parents('.cart-goods-box').find('.cart-goods-alc').html(smalltotal($(this)));
    totalprice();
    changecookie($(this));
})


$('.cart-goods-value').prev().on('click',function(){
    var $buynum=parseInt($(this).next('input').val());
    $buynum--;
    if($buynum<1){
        $(this).next('input').val(1);
    }else{
       $(this).next('input').val($buynum); 
    }
    $(this).parents('.cart-goods-box').find('.cart-goods-alc').html(smalltotal($(this)));
    totalprice();
    changecookie($(this));
});

$('.cart-goods-value').on('input',function(){
    var v=parseInt($(this).val());
    var reg=/^\d+$/g;
    if(reg.test(v)){
        if(v<=0){
            $(this).val(1)   
        }else if(v>99){
            $(this).val(99) 
        }else{
            $(this).val(v);
        }
    }else{
       $(this).val(1) 
    }
    $(this).parents('.cart-goods-box').find('cart-goods-alc').html(smalltotal($(this)));
    totalprice();
    changecookie($(this)); 
});

	function changecookie(obj){
	    cookiearr();
	    var $index=obj.parents('.cart-goods-box').find('.cart-goods-img').find('img').attr('sid');
	    numarr[sidarr.indexOf($index)]=obj.parents('.cart-goods-box').find('.cart-goods-value').val();
	    addCookie('cartnum', numarr.toString(), 7);
	}
})