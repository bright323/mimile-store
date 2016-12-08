$(function(){
	function arrsearch(value, arr) { //value:数组的值，arr：数组
        for (var i = 0; i < arr.length; i++) {
            if (value == arr[i]) {
                return i;//取找到值的位置
            }
        }
        return false;
    }

    function arrsearch1(value, arr) { //value:数组的值，arr：数组
        for (var i = 0; i < arr.length; i++) {
            if (value == arr[i]) {
                return true;//位置后一位
            }
        }
        return false;
    }
    $(".login-enter i").on("click",function(){
     	var userinfo = getCookie('usermore');
        var userarr = userinfo.split(',');//cookie值转换成数组
        if(arrsearch1($('#login-txt').val(), userarr)){
            var index= arrsearch($('#login-txt').val(), userarr);
            if($('#login-txt-psw').val() !=userarr[index+1]){
                alert('密码错误');
            }else{
                addCookie('user1',$('#login-txt').val(),7);
                addCookie('pass1',$('#login-txt-psw').val(),7);
                window.location = "a.html";
            }
        }else{
            alert('用户名不存在');
        }
    })
})