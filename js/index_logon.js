//index_logon.js

//登录方法
function submitall() {
    var username = useid$("username").value;
    var password = useid$("password").value;

    if (username == "" || password == "") {
        alert("尚未输入信息");
        return;
    }

    var xhr = createXhr();
    xhr.open("post", "php/index.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var arr = eval(xhr.responseText);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == 1) {
                    alert("登陆成功！");
                    var date = new Date();
                    date.setTime(date.getTime() + 30 * 60 * 1000);
                    var key = "key=ok;expires=" + date.toGMTString();
                    document.cookie = key;
                    content_jump_src = "index_online.html";
                    change_src();
                } else {
                    alert("账号密码错误！");
                    useid$("username").value = "";
                    useid$("password").value = "";
                }
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var userlogin = {
        "username": username,
        "password": password
    };
    xhr.send("userlogin=" + JSON.stringify(userlogin));
}