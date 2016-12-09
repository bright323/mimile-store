			//document.cookie是字符串---name = zhangsan; age = 23; 
			//document.cookie是字符串，先利用split方法，把每一个cookie分隔出来
			//然后分隔出来的数组的每一项即每一个cookie，也是字符串类型，再次利用split方法，将每一个
			//cookie分割成长度为2的数组，数组的第一项是name，第二项就是值
			
			//读写不直观，所以要写函数setCookie()， getCookie()，removeCookie()
			
			//setCookie()函数
			function addCookie(key,value,exdays) {
				var dateNow = new Date() ;
				var codeValue = encodeURI(value) ;
				dateNow.setDate(dateNow.getDate() + exdays) ;
				document.cookie = key + '=' + codeValue + '; expires=' + dateNow.toUTCString() + '; Path=/' ;
			}



			//获取cookie
			function getCookie(key) {
				var arr1 = document.cookie.split('; ');
				for (var i=0; i<arr1.length; i++) {
					var arr2 = arr1[i].split('=');
					if ( arr2[0] == key ) {
						return decodeURI(arr2[1]);
					}
				}
			}

			
			//删除cookie,把过期时间设置为以前的时间，cookie就立刻失效，实现了删除
			function removeCookie(name){
				addCookie(name,"",-1);
			}
			
	