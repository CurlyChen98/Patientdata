// frame.js
window.onload = function () {
    change_src();
    var addRippleEffect = function (e) {
        var target = e.target; //返回触发事件的节点
        if (target.className.toLowerCase() === 'title_div') {
            return false;
        }
        if (target.tagName.toLowerCase() !== 'div') { //把字符串全部转换为小写
            return false;
        }
        var rect = target.getBoundingClientRect(); //获取点击的元素的位置
        var ripple = target.querySelector('.ripple1'); //获取点击的元素里面的class为ripple的第一个元素
        if (!ripple) { //如有没有class为ripple的元素则创建一个
            ripple = document.createElement('span');
            ripple.className = 'ripple1';
            ripple.style.height = ripple.style.width = '600px';
            target.appendChild(ripple);
        }
        ripple.classList.remove('show1');
        var top = e.pageY - rect.top - ripple.offsetHeight / 2;
        var left = e.pageX - rect.left - ripple.offsetWidth / 2;
        ripple.style.top = top + 'px'
        ripple.style.left = left + 'px'
        ripple.classList.add('show1');
        return false;
    }
    document.addEventListener('click', addRippleEffect, false); //给整个页面所有元素添加点击事件
    binding();
    setting();

    var now = new Date();
    var jian = now.getDate();
    now.setDate(jian - 1);
    document.cookie = "key=;expires=" + now.toGMTString();
}

//获取页面设置
function setting() {
    var xhr = createXhr();
    xhr.open("post", "php/setting.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var get = JSON.parse(xhr.responseText)
            for (var i = 0; i < get.length; i++) {
                if (get[i]['setting_name'] == "body_background") {
                    var body = document.body;
                    body.style.background = "url('img/background/" + get[i]['setting_detail'] + "')";
                }
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "html_page=" + JSON.stringify("frame") + "&what_move=" + JSON.stringify("get_setting");
    xhr.send(push);
}

//frame.html加载时为指定元素绑定事件
function binding() {
    //为搜索栏搜索类型按钮添加事件
    var arr = document.getElementById("Search_div_text").children;
    for (var i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', function () {
            useid$("Search_kind").innerHTML = this.innerHTML;
        });
    }
}

//frame.html搜索栏点击提交按钮触发事件
function submit_search() {
    var getkey = login_check();
    if (getkey == null) {
        alert("No login");
        content_jump_src = "index_login.html";
        change_src();
        return;
    }

    var Search_kind = useid$("Search_kind").innerHTML;
    var Search_text = useid$("Search_text").value;
    if (Search_kind == "What") {
        alert("You haven't chosen the type yet!");
        return;
    }
    //设置搜索类型和搜索内容的cookie
    var cookie = "kind=" + Search_kind;
    document.cookie = cookie;
    cookie = "text=" + Search_text;
    document.cookie = cookie;
    //调用跳转方法
    content_jump_src = "outside.html";
    change_src();
}

//判断是否已登录
function login_check() {
    var key = "key=";
    var getkey = null;
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        ca[i] = ca[i].trim();
        if (ca[i].indexOf(key) == 0) {
            getkey = ca[i].substring(key.length, ca[i].length);
        }
    }
    return getkey;
}

// 标题栏的点击跳转事件
function jump_html(res) {
    var getkey = login_check();
    if (getkey == null) {
        alert("No login");
        content_jump_src = "index_login.html";
        change_src();
        return;
    }

    if (res == 1) {
        content_jump_src = "index_online.html";
        change_src();
    }
    if (res == 2) {
        content_jump_src = "inside.html";
        change_src();
    }
    if (res == 3) {
        var now = new Date();
        var jian = now.getDate();
        now.setDate(jian - 1);
        document.cookie = "kind=;expires=" + now.toGMTString();
        document.cookie = "text=;expires=" + now.toGMTString();
        document.cookie = "id=;expires=" + now.toGMTString();
        content_jump_src = "outside.html";
        change_src();
    }
    if (res == 4) {
        content_jump_src = "setting.html";
        change_src();
    }
}

//点击左边栏触发的事件
function jump_toid(num) {
    var toid = "";
    if (num == 1) {
        toid = "auto_inside_one";
    }
    if (num == 2) {
        toid = "auto_inside_two";
    }
    if (num == 3) {
        toid = "auto_inside_three";
    }
    if (num == 4) {
        toid = "auto_inside_four";
    }
    if (num == 5) {
        toid = "auto_inside_five";
    }
    if (num == 6) {
        toid = "auto_inside_six";
    }
    if (num == 7) {
        toid = "auto_inside_seven";
    }
    if (num == 8) {
        toid = "auto_inside_eight";
    }
    useid$('contentsrc').contentWindow.useid$(toid).scrollIntoView();
}