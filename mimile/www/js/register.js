$(function(){
	/*----------------提示信息淡入淡出---------------*/

    $(".register-info").find('input').not($('input:checkbox')).on("focus",function(){
    	$(this).prev('.bot').fadeIn();	
	})
	$(".register-info").find('input').not($('input:checkbox')).on("blur",function(){
    	$(this).prev('.bot').fadeOut();
    })
	$(".par").on("focus",function(){
		$(this).parent().prev('.bot').fadeIn();
	})
	$(".par").on("blur",function(){
		$(this).parent().prev('.bot').fadeOut();
	})
	
	/*--------------------注册验证------------------*/

	 function arrsearch(value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (value == arr[i]) {
                return true;
            }
        }
        return false;
    }
    var arr = [];
    var pattern = /1[34578]{1}[0-9]{9}/;
    var pattern2 = /^[a-zA-Z0-9]{6,10}$/;
    var user = $("#register-txt").val();
    var pass = $("#register-psw").val();

    $(".agree-register").on("click",function() {
        var user = $("#register-txt").val();
        var pass = $("#register-psw").val();
        /*------手机号验证-------*/
        if(pattern.test(user)){
        	if(getCookie('usermore') == undefined){
        		if (user == '' || pass == '') {
                	alert('用户名或者密码不能为空');
            	} else {
                addCookie('usermore', arr.toString(), 7);
                window.location = 'login.html';
            	}
            }else {
            	arr = getCookie("usermore").split(',');
	            if (arrsearch(user.value, arr)) {
	                alert('该用户名已经存在');
	                user.value='';
	                user.focus();
	            } else {
	                arr.push(user, pass);
	                addCookie('usermore', arr.toString(), 7);
	                window.location = 'login.html';
	            }
        	user.value='';
        	}
        }else{
        	alert('手机号不合法');
        }
        /*------密码验证-------*/
        if(pattern2.test(pass)){
        	if(getCookie('usermore') == undefined){
        		arr.push(user,pass);
        		addCookie('usermore', arr.toString(), 7);
        		window.location = 'login.html';
        	}
        }else{
        	alert('密码不合法');
        }
        user='';

        if($('#agree-check').prop('checked')){
        	window.location = 'login.html';
        }else{
        	window.location = "";
        }
    })

      /*----------------验证码-------------------*/

    $("#regis-code").on("change",function(){
 		if($("#regis-code").val() != $(".experice-code").html()){
        	alert('验证码输入错误');
        	$("#regis-code").val('')
        }
    })

    $(".code-blur").on("click",function(){
    	$(".experice-code").html(randomNum());
    	var randomC = randomColor();
    	$(".experice-code").css({
    		color:randomC
    	});
    })

    /*-----------------随机数------------------*/
	function randomNum(){
		var s = '';
		function Rand(min,max){
			return parseInt(Math.random()*(max-min+1)+min);
		}
		var index = -1;
		var count = 0;
		while(count<4){
			var index = Rand(48,122);
			if((index>=65&&index<=90)||(index>=97&&index<=122)||(index>=48&&index<=57)){
				s += String.fromCharCode(index);
				count++;
			}
		}
		return s;	
	}

    /*------------------随机颜色-----------------*/

	function randomColor(){
		return '#' + Math.floor(Math.random() * 0xffffff).toString(16); 
	}


})