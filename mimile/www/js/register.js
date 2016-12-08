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
	 function arrsearch(value, arr) { //value:数组的值，arr：数组
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
    $("#register-txt").focus();
    $(".agree-register").on("click",function() {
        var user = $("#register-txt").val();
        var pass = $("#register-psw").val();
        /*------手机号验证-------*/
        if(pattern.test(user)){
        	if(getCookie('usermore') == undefined){
        		arr.push(user,pass);
        		addCookie('usermore', arr.toString(), 7); //添加cookie
        	}else{
        		alert('改号码已注册')
        	}
        }else{
        	alert('手机号不合法');
        }
        /*------密码验证-------*/
        if(pattern2.test(pass)){
        	if(getCookie('usermore') == undefined){
        		arr.push(user,pass);
        		addCookie('usermore', arr.toString(), 7); //添加cookie
        	}
        }else{
        	alert('密码不合法');
        }

        // if (getCookie('usermore') == undefined) {
        //     arr.push(user, pass); //用户信息存到数组
        //     if (user == '' || pass == '') {
        //         alert('用户名或者密码不能为空');
        //     } else {
        //         addCookie('usermore', arr.toString(), 7); //添加cookie
        //         window.location = 'login.html';
        //     }
        // }else {
        //     arr = getCookie("usermore").split(',');
        //     if (arrsearch(user, arr)) {
        //         alert('该用户名已经存在');
        //        user='';
        //        $("#register-txt").focus();
        //     } else {
        //         arr.push(user, pass);
        //         addCookie('usermore', arr.toString(), 7);
        //         window.location = 'login.html';
        //     }
        // }
        user='';
    })
})