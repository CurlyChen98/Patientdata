// setting.js
//setting.html初始化时候调用的绑定事件的事件
function setfun() {
    //为button_tow_file绑定two_changefile的点击事件
    useid$("button_tow_file").onclick = function () {
        useid$("two_changefile").click();
    }
    useid$("button_thr_file").onclick = function () {
        useid$("thr_changefile").click();
    }
    var div_four = document.getElementById("dropdownMenu1_menu").children;
    for (var i = 0; i < div_four.length; i++) {
        div_four[i].addEventListener('click', function () {
            document.getElementById("dropdownMenu1").innerHTML = this.innerHTML;
        })
    }
    var div_four = document.getElementById("dropdownMenu2_menu").children;
    for (var i = 0; i < div_four.length; i++) {
        div_four[i].addEventListener('click', function () {
            document.getElementById("four_backgournd_img").src = "img/background/" + this.innerHTML;
            document.getElementById("dropdownMenu2").innerHTML = this.innerHTML;
        })
    }
    var div_four = document.getElementById("dropdownMenu3_menu").children;
    for (var i = 0; i < div_four.length; i++) {
        div_four[i].addEventListener('click', function () {
            document.getElementById("dropdownMenu3").innerHTML = this.innerHTML;
        })
    }
}

//setting.html修改网页背景按钮点击事件
function update_backgournd(res) {
    var menu2 = document.getElementById("dropdownMenu2").innerHTML;
    if (menu2 == "Select") {
        alert("You haven't chosen a picture yet!");
        return;
    }
    var xhr = createXhr();
    xhr.open("post", "php/setting.php", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
            var get = JSON.parse(xhr.responseText)
            if (get == "ok!") {
                alert("上传成功");
                load_backgournd_img();
                setfun();
            } else {
                alert("上传失败，详情请咨询");
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (res == "update") {
        var push = "pic_name=" + JSON.stringify(menu2) + "&what_move=" + JSON.stringify("update_backgournd");
    } else if (res == "delete") {
        var push = "pic_name=" + JSON.stringify(menu2) + "&what_move=" + JSON.stringify("delete_backgournd");
    }
    xhr.send(push);
}

//setting.html加载时调用的载入数据表的方法用于第三方块
function load_table() {
    useid$("dropdownMenu3_menu").innerHTML = "";
    var xhr = createXhr();
    xhr.open("post", "php/setting.php", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.responseText)
            var get = JSON.parse(xhr.responseText)
            for (var i = 0; i < get.length; i++) {
                useid$("dropdownMenu3_menu").innerHTML += "<a class='dropdown-item'>" + get[i]["Tables_in_patient_data"] + "</a>"
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "what_move=" + JSON.stringify("get_table");
    xhr.send(push);
}

//setting.html加载时调用的方法用于加载第四方块
function load_backgournd_img() {
    useid$("dropdownMenu2_menu").innerHTML = "";
    var xhr = createXhr();
    xhr.open("post", "php/setting.php", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var get = JSON.parse(xhr.responseText)
            for (var i = 0; i < get.length; i++) {
                useid$("dropdownMenu2_menu").innerHTML += "<a class='dropdown-item'>" + get[i]["setting_detail"] + "</a>"
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "html_page=" + JSON.stringify("setting") + "&what_move=" + JSON.stringify("get_setting");
    xhr.send(push);
}

//setting.html选择上传的文件后触发的事件
var file_form = new FormData();
function file_change(res) {
    if (res == 3) {
        var file = document.getElementById("thr_changefile").files[0];
        if (file) { file_form.append("file", file); }
        document.getElementById("text_thr").value = file.name;
    }
    if (res == 2) {
        var file = document.getElementById("two_changefile").files[0];
        if (file) { file_form.append("file", file); }
        document.getElementById("text_two").value = file.name;
        var reader = new FileReader();
        reader.readAsDataURL(file);//将文件以Data URL形式读入页面 
        reader.onload = function (e) {
            var result = document.getElementById("result");
            document.getElementById("two_backgournd_img").src = this.result;
        }
    }
}

//setting.html上传图片的按钮点击触发的方法
function up_file(res) {
    if (res == 2) {
        var text = document.getElementById("text_two").value;
        if (text == "") {
            alert("错误");
            return;
        }
        file_form.append("what_move", JSON.stringify("in_setting_backgournd"));
        file_form.append("image_name", JSON.stringify(text));
    } else if (res == 3) {
        file_form.append("what_move", JSON.stringify("sqlfile"));
    }

    var xhr = createXhr();
    xhr.open("post", "php/setting.php", true);
    xhr.onload = function () {
        console.log(xhr.responseText)
        var get = JSON.parse(xhr.responseText)
        if (get == "ok!") {
            console.log(get)
            alert("上传成功");
            load_backgournd_img();
            load_table();
            setfun();
        } else if (get == "over!") {
            alert("执行完毕");
        } else {
            alert("上传失败，详情请咨询");
        }
    }
    xhr.send(file_form);
}

//setting.html修改用户名或者密码的按钮点击事件
function update_use() {
    var title = useid$("dropdownMenu1").innerHTML;
    if (title == "Change") {
        alert("Change what1");
        return;
    }
    var text = useid$("text_one").value;
    if (text == "") {
        alert("Change what2");
        return;
    }
    var xhr = createXhr();
    xhr.open("post", "php/setting.php", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var get = JSON.parse(xhr.responseText)
            if (get == "ok!") {
                alert("上传成功");
                var date = new Date();
                date.setTime(date.getTime() - 30 * 60 * 1000);
                var key = "key=ok;expires=" + date.toGMTString();
                document.cookie = key;
            } else {
                alert("上传失败，详情请咨询");
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "update_what=" + JSON.stringify(title) + "&update_text=" + JSON.stringify(text) + "&what_move=" + JSON.stringify("update_use");
    xhr.send(push);
}

//setting.html第五方块删除表按钮点击后触发事件
function drop_table() {
    var select = useid$("dropdownMenu3").innerHTML;
    if (select == "Select") {
        alert("没有选择任何"); return;
    }
    var geime = prompt("请输入drop");
    if (geime != "drop") {
        alert("输入错误！"); return;
    }
    var xhr = createXhr();
    xhr.open("post", "php/setting.php", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            var get = JSON.parse(xhr.responseText)
            if (get == "ok!") {
                alert("上传成功");
                load_table();
                setfun();
            } else {
                alert("上传失败，详情请咨询");
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "drop_what=" + JSON.stringify(select) + "&what_move=" + JSON.stringify("drop_table");
    xhr.send(push);
}