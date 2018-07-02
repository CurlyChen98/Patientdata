// my_all.js
/**
 * 1.简写方法(document.getElementById)
 * 2.需要录入(id)
 */
function useid$(id) {
    return document.getElementById(id);
}

/**
 * 1.新建一个请求对象
 */
function createXhr() {
    if (window.XMLHttpRequest) {
        //code buy 市面上的浏览器
        var Xhr = new window.XMLHttpRequest;
    } else {
        //code buy IE8以下
        var Xhr = new ActiveXObject("Microsoft.XMLHttp");
    }
    return Xhr;
}

//跳转页面的方法
var content_jump_src = "index_login.html";// 初始页面
function change_src() {
    window.parent.useid$("contentsrc").src = content_jump_src;
    if (useid$("ul_inside_jump")) {
        useid$("ul_inside_jump").style.display = "none";//用于隐藏左边跳跃栏
    }
    if (content_jump_src == "inside.html") {
        useid$("ul_inside_jump").style.display = "block";//用于显示或隐藏左边跳跃栏
        window.parent.useid$("contentsrc").scrolling = "yes";
    }
    if (content_jump_src == "outside_more.html") {
        window.parent.useid$("ul_inside_jump").style.display = "block";//用于显示或隐藏左边跳跃栏
        window.parent.useid$("contentsrc").scrolling = "yes";
    }
}

//页面命名引用
var index_online = "index_online.html"//已登陆的主页