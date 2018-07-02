// inside.js
window.onload = function () {
    load_inside();
}

//页面加载时调用的加载控件方法
function load_inside() {
    var xhr = createXhr();
    xhr.open("post", "php/inside_show.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var arr = eval(xhr.responseText);
            for (var i = 0; i < arr.length; i++) {
                load_input(arr[i]["kind_one"], arr[i]);
                // console.log(arr[i]);
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();

    var date = new Date();
    var year = date.getFullYear();
    var mon = date.getMonth() + 1;
    var day = date.getDate();
    useid$("form_today").value = year + "-" + mon + "-" + day;
}

//页面加载时调用的加载控件方法
var div_id = ""; //每个大类都有一个div包含、此变量存储着该div的id
var sp_leng_1 = null, sp_leng_2 = null;
var sp_ying_1 = null, sp_ying_2 = null;
function load_input(res, arr) {
    var join = "";
    if (res == "1") {
        var auto_inside = useid$("auto_inside_one");
    } if (res == "2") {
        var auto_inside = useid$("auto_inside_two");
    } if (res == "3") {
        var auto_inside = useid$("auto_inside_three");
    } if (res == "4") {
        var auto_inside = useid$("auto_inside_four");
    } if (res == "5") {
        var auto_inside = useid$("auto_inside_five");
    } if (res == "6") {
        var auto_inside = useid$("auto_inside_six");
    } if (res == "7") {
        var auto_inside = useid$("auto_inside_seven");
    } if (res == "8") {
        var auto_inside = useid$("auto_inside_eight");
    }
    // 每个大类的第一个小类要换行再输出
    input_id = arr['content'] + "_" + arr['kind_one'] + "_" + arr['kind_two'] + "_" + arr['kind_thr'];
    input_name = arr['content'] + "_" + arr['kind_one'] + "_" + arr['kind_two'];
    if (arr['kind_thr'] == "1") {
        div_id = "div_" + arr['kind_one'] + "_" + arr['kind_two'];
        auto_inside.innerHTML += "<div class='div-line' id='" + div_id + "'><span style='height: 30px;line-height: 30px;'>" + arr['kind_two'] + ".</span></div>";
    }
    // 莫些类需要以特殊方式输出
    if (sp_leng_1 == arr['kind_one'] && sp_leng_2 == arr['kind_two']) {
        if (arr["kind_thr"] == 2) {
            //先建立表格并赋予id
            useid$(div_id).innerHTML += "<table border='0' cellspacing='0' id='six_six_table'></table>"
            //建立三行tr并赋予id且插入表格
            useid$("six_six_table").innerHTML += "<tr id='six_six_table1'></tr>";
            useid$("six_six_table").innerHTML += "<tr id='six_six_table2'></tr>";
            useid$("six_six_table").innerHTML += "<tr id='six_six_table3'></tr>";
            //第一行是固定值先插入
            useid$("six_six_table1").innerHTML += "<th>冷热试验:</th> <th>SPV[°/S]</th> <th>固视抑制指数</th> <th>&nbsp;&nbsp;&nbsp;&nbsp;</th> <th></th> <th>SPV[°/S]</th> <th>固视抑制指数</th>";
        } if (arr["kind_thr"] > 1 && arr["kind_thr"] < 6) {
            if (arr["kind_thr"] == 2) {
                useid$("six_six_table2").innerHTML += "<th>右冷(44℃)</th>";
            } if (arr["kind_thr"] == 4) {
                useid$("six_six_table2").innerHTML += "<th>&nbsp;&nbsp;&nbsp;&nbsp;</th><th>左冷(44℃)</th>";
            }
            useid$("six_six_table2").innerHTML += "<th>" + arr['inhtml'] + "<input class='form-control auto_text' type='text' id='" + input_id + "'></th>";
        } if (arr["kind_thr"] > 5 && arr["kind_thr"] < 10) {
            if (arr["kind_thr"] == 6) {
                useid$("six_six_table3").innerHTML += "<th>右热(30℃)</th>";
            } if (arr["kind_thr"] == 8) {
                useid$("six_six_table3").innerHTML += "<th>&nbsp;&nbsp;&nbsp;&nbsp;</th><th>左热(30℃)</th>";
            }
            useid$("six_six_table3").innerHTML += "<th>" + arr['inhtml'] + "<input class='form-control auto_text' type='text' id='" + input_id + "'></th>";
        }
        return;
    } if (sp_ying_1 == arr['kind_one'] && sp_ying_2 == arr['kind_two']) {
        if (arr["kind_thr"] == 2) {
            useid$(div_id).innerHTML += "<table border='0' cellspacing='0' id='six_eleven_table'></table>";
        } if (arr["kind_thr"] > 1) {
            useid$("six_eleven_table").innerHTML += "<tr><th>" + arr['inhtml'] + "</th><th><input onclick='showtext(" + input_id + ")' class='form-control auto_text text_long' type='text' id='" + input_id + "' placeholder='" + arr["invalue"] + "'></th></tr>";
        }
        return;
    } if (arr['inhtml'] == "冷热试验:") {
        sp_leng_1 = arr['kind_one'];
        sp_leng_2 = arr['kind_two'];
        return;
    } if (arr['inhtml'] == "印象：提示") {
        sp_ying_1 = arr['kind_one'];
        sp_ying_2 = arr['kind_two'];
    } if (arr['inhtml'] == "摇头试验:") {
        useid$(div_id).innerHTML += "<span class='auto_span'>" + arr['inhtml'] + "</span><input onclick='showtext(" + input_id + ")' class='form-control auto_text text_long' type='text' id='" + input_id + "' placeholder='" + arr["invalue"] + "'>";
        return;
    } if (arr['inhtml'] == "甩头试验:") {
        useid$(div_id).innerHTML += "<span class='auto_span'>" + arr['inhtml'] + "</span><input onclick='showtext(" + input_id + ")' class='form-control auto_text text_long' type='text' id='" + input_id + "' placeholder='" + arr["invalue"] + "'>";
        return;
    } if (arr['inhtml'] == "单侧减弱:" || arr['inhtml'] == "优势偏向:" || arr['inhtml'] == "迷路反应:") {
        useid$(div_id).innerHTML += "<span class='auto_span'>" + arr['inhtml'] + "</span><input onclick='showtext(" + input_id + ")' class='form-control auto_text' type='text' id='" + input_id + "' placeholder='" + arr["invalue"] + "'>";
        return;
    } if (arr['inhtml'] == "准确度") {
        useid$(div_id).innerHTML += "<span class='auto_span'>" + arr['inhtml'] + "</span><input onclick='showtext(" + input_id + ")' class='form-control auto_text' type='text' id='" + input_id + "' placeholder='" + arr["invalue"] + "'>";
        return;
    }

    // 判断是什么类型的input就以什么方式输出
    if (arr['content'] == "text") {
        useid$(div_id).innerHTML += "<span class='auto_span'>" + arr['inhtml'] + "</span><input class='form-control auto_text' type='text' id='" + input_id + "'>";
    } else if (arr['content'] == "null") {
        useid$(div_id).innerHTML += "<span class='auto_span'>" + arr['inhtml'] + "</span>";
    } else if (arr['content'] == "textarea") {
        useid$(div_id).innerHTML += "<textarea id='" + input_id + "'></textarea>";
    } else if (arr['content'] == "checkbox") {
        useid$(div_id).innerHTML += "<input value='" + arr['invalue'] + "' type='" + arr['content'] + "' name='" + input_name + "' id='" + input_id + "'><label for='" + input_id + "'>" + arr['inhtml'] + "</label>";
    }
}

//点击显示预置文本的方法
function showtext(res) {
    if (res.value == "") {
        useid$(res.id).value = res.placeholder;
    }
}

//性别选择器点击触发事件
function select_sex(res) {
    if (res == 1) {//1等于男
        useid$("dropdownMenu1").innerHTML = "男";
    }
    if (res == 0) {//0等于女
        useid$("dropdownMenu1").innerHTML = "女";
    }
}

//出生年月日输入框失去焦点触发事件
function input_date() {
    var date = new Date();
    date = date.getFullYear();
    var input = useid$("form_bron").value;
    input = new Date(input);
    input = input.getFullYear();
    console.log("现在时间:" + date);
    console.log("输入的时间:" + input);
    useid$("form_age").value = date - input;
}

//请求数据库返回一共有多少类
function kind_num() {
    var xhr = createXhr();
    xhr.open("post", "php/kind_num.php", false);
    var arr_kind_out;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var arr = JSON.parse(xhr.responseText);
            arr_kind_out = arr;
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    return arr_kind_out;
}

//ajax获取回来的对象通过该方法获取长度
function get_arr_len(arr) {
    var arr_len = 0;
    for (var i in arr) {
        arr_len++;
    }
    return arr_len;
}

//表单提交方法
function submit_form() {
    var arr_kind = kind_num();
    var len1 = get_arr_len(arr_kind);
    var push_inside = [];
    for (var i = 1; i <= len1; i++) {
        var len2 = get_arr_len(arr_kind[i]);
        for (var k = 1; k <= len2; k++) {
            for (var j = 1; j <= arr_kind[i][k]; j++) {
                var tag;
                var arr;
                //收集复选框
                tag = useid$("checkbox_" + i + "_" + k + "_" + j);
                if (tag) {
                    var arr = [i, k, j, tag.value, "checkbox"];
                    if (tag.checked == true) {
                        push_inside.push(arr);
                    }
                }
                // 收集文本框
                tag = useid$("text_" + i + "_" + k + "_" + j);
                if (tag) {
                    tag.value = tag.value.replace(/\+/g, "%2B");////////////////////////
                    var arr = [i, k, j, tag.value, "text"];
                    if (tag.value != "") {
                        push_inside.push(arr);
                    }
                }
                //收集文本域
                tag = useid$("textarea_" + i + "_" + k + "_" + j);
                if (tag) {
                    var arr = [i, k, j, tag.value, "textarea"];
                    if (tag.value != "") {
                        push_inside.push(arr);
                    }
                }
            }
        }
    }
    // 获取用户基本信息
    var name = useid$("form_name").value;
    var bron = useid$("form_bron").value;
    var age = useid$("form_age").value;
    var number = useid$("form_number").value;
    var num = useid$("form_num").value;
    var today = useid$("form_today").value;
    var sex = useid$("dropdownMenu1").innerHTML;
    var patient_name = { "name": name, "bron": bron, "age": age, "number": number, "num": num, "today": today, "sex": sex };
    //判断个人信息是否有输入
    if (name == "") {
        alert("未输入完整信息");
        useid$("form_name").focus();
        return;
    }if (bron == "") {
        alert("未输入完整信息");
        useid$("form_bron").focus();
        return;
    }if (sex == "性别") {
        alert("未选择完整信息");
        useid$("form_num").focus();
        return;
    }if (num == "") {
        alert("未输入完整信息");
        useid$("form_num").focus();
        return;
    }
    //提交
    var xhr = createXhr();
    xhr.open("post", "php/inside_in.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var get = JSON.parse(xhr.responseText)
            if (get = "inside") {
                alert("录入成功");
                content_jump_src = "outside.html";
                change_src();
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "push_inside=" + JSON.stringify(push_inside) + "&patient_name=" + JSON.stringify(patient_name) + "&what_move=" + JSON.stringify("inside");
    xhr.send(push);
}