// outside.js

// 界面加载时触发的加载数据方法
var page = 1;// 默认第一页开始
var page_num = 20;// 每页显示多少个
var countnum = 0;
function showtable() {
    // 获取cookie里面有无搜索内容
    var kind = "kind=", text = "text=", cookie_page = "page=";
    var getkind = null, gettext = null, getpage = null;
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        ca[i] = ca[i].trim();
        if (ca[i].indexOf(kind) == 0) {
            getkind = ca[i].substring(kind.length, ca[i].length);
        }
        if (ca[i].indexOf(text) == 0) {
            gettext = ca[i].substring(text.length, ca[i].length);
        }
        if (ca[i].indexOf(cookie_page) == 0) {
            getpage = ca[i].substring(cookie_page.length, ca[i].length);
        }
    }

    if (getkind == null || gettext == null) {
        var arr = ['All', 'Null'];
    } else {
        var arr = [getkind, gettext];
    }
    if(getpage != null){
        page = getpage;
    }
    //请求后台输出病患基本信息
    var xhr = createXhr();
    xhr.open("post", "php/outside_all.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            show_allpatient(JSON.parse(xhr.responseText))
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "arr=" + JSON.stringify(arr) + "&page=" + JSON.stringify(page) + "&what_move=" + JSON.stringify("select");
    xhr.send(push);
}

//outside_all.html加载时请求后台数据后处理数据的方法
function show_allpatient(arr) {
    //获取数据总数量，判断输出页码
    var div_page = useid$("min_page");
    div_page.innerHTML = "";
    countnum = Math.ceil(arr[0]["count"] / page_num);
    page = parseInt(page);
    if (page < 4) {
        if (countnum <= 5) {
            for (var i = 1; i <= countnum; i++) {
                div_page.innerHTML += "<span>" + i + "</span>";
            }
        } else if (countnum > 5) {
            for (var i = 1; i <= 5; i++) {
                div_page.innerHTML += "<span>" + i + "</span>";
            }
            div_page.innerHTML += "&nbsp...&nbsp";
        }
    } else if (page >= 4) {
        if (page >= 4 && countnum > 5) {
            div_page.innerHTML += "&nbsp...&nbsp";
        }
        if (page + 2 >= countnum) {
            if (countnum == 4) {
                for (var i = 1; i <= countnum; i++) {
                    div_page.innerHTML += "<span>" + i + "</span>";
                }
            }
            else{
                for (var i = countnum - 4; i <= countnum; i++) {
                    div_page.innerHTML += "<span>" + i + "</span>";
                }
            }
        } else if (page + 2 < countnum) {
            for (var i = page - 2; i <= page + 2; i++) {
                div_page.innerHTML += "<span>" + i + "</span>";
            }
            div_page.innerHTML += "&nbsp...&nbsp";
        }
    }


    var div_children = useid$("min_page").children;
    for (var i = 0; i < div_children.length; i++) {
        if(div_children[i].innerHTML==page){
            div_children[i].style.color = "#1867ce" ;
        }
        div_children[i].addEventListener('click', function () {
            page = this.innerHTML;
            var cookie_page = "page=" + page;
            document.cookie = cookie_page;
            showtable();
        })
    }

    //获取表格元素，清空然后添加内容上去
    var table = useid$("table_show_tbody");
    table.innerHTML = "";
    for (var i = 1; i < arr.length - 1; i++) {
        var arr_judgment = arr[arr.length - 1];
        var judgment_five = [], judgment_seven = [];
        for (var k = 0; k < arr_judgment.length; k++) {
            if (arr[i]['id'] == arr_judgment[k]['patient_id']) {
                if (arr_judgment[k]['kind_one'] == 5) {
                    judgment_five.push(arr_judgment[k]['invalue']);
                }
                if (arr_judgment[k]['kind_one'] == 7) {
                    judgment_seven.push(arr_judgment[k]['invalue']);
                }
            }
        }
        table.innerHTML += "<tr id='" + arr[i]['id'] + "'></tr>";
        useid$(arr[i]['id']).innerHTML += "<th><a onclick='jump(" + arr[i]['id'] + ")' href='#'>" + arr[i]['name'] + "</a></th>";
        useid$(arr[i]['id']).innerHTML += "<th>" + arr[i]['age'] + "</th>";
        useid$(arr[i]['id']).innerHTML += "<th>" + arr[i]['num'] + "</th>";
        useid$(arr[i]['id']).innerHTML += "<th>" + judgment_five + "</th>";
        useid$(arr[i]['id']).innerHTML += "<th>" + judgment_seven + "</th>";
        useid$(arr[i]['id']).innerHTML += "<th>" + arr[i]['today'] + "</th>";
    }
}

// outside_all.html点击某个用户跳转到用户的详细信息页
function jump(res) {
    content_jump_src = "outside_more.html";
    var cookie = "id=" + res;
    document.cookie = cookie;
    change_src();
}

// 载入详细页获取cookie
function load_move() {
    var find = "id=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        ca[i] = ca[i].trim();
        if (ca[i].indexOf(find) == 0) {
            var id = ca[i].substring(find.length, ca[i].length);
            return id;
        }
    }
}

//页面加载时调用的加载控件方法
function load_inside() {
    var xhr = createXhr();
    xhr.open("post", "php/inside_show.php", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var arr = eval(xhr.responseText);
            for (var i = 0; i < arr.length; i++) {
                load_input(arr[i]["kind_one"], arr[i]);
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
}

//页面加载时调用的加载控件方法
var div_id = ""; //每个大类都有一个div包含、此变量存储着该div的id
var sp_leng_1 = null, sp_leng_2 = null;
var sp_ying_1 = null, sp_ying_2 = null;
var sp_yao_1 = null, sp_yao_2 = null;
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

//通过cookie的id请求后台获取该用户详细数据
function load_user_all(res) {
    var id = res;
    var xhr = createXhr();
    xhr.open("post", "php/outside_one.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var arr = JSON.parse(xhr.responseText);
            show_patient("编号", arr[0]['id'], "oid");
            show_patient("姓名", arr[0]['name'], "name");
            show_patient("年龄", arr[0]['age'], "age");
            show_patient("性别", arr[0]['sex'], "sex");
            show_patient("住院号/门诊号", arr[0]['num'], "num");
            show_patient("电话号码", arr[0]['number'], "number");
            show_patient("出生年月日", arr[0]['bronday'], "bron");
            show_patient("录入日期", arr[0]['today'], "today");
            for (var i = 1; i < arr.length; i++) {
                var kind1 = arr[i]['kind_one'];
                var kind2 = arr[i]['kind_two'];
                var kind3 = arr[i]['kind_thr'];
                var all_kind = kind1 + "_" + kind2 + "_" + kind3;
                if (useid$("text_" + all_kind)) {
                    useid$("text_" + all_kind).value = arr[i]['invalue'];
                } if (useid$("checkbox_" + all_kind)) {
                    useid$("checkbox_" + all_kind).checked = true;
                } if (useid$("textarea_" + all_kind)) {
                    useid$("textarea_" + all_kind).value = arr[i]['invalue'];
                }
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id);

    function show_patient(test, rew, oid) {
        useid$("patient_data_table").innerHTML += "<tr><th>" + test + "</th><th><input id=form_" + oid + " class='form-control small_text' type='text' value='" + rew + "'></th></tr>";
    }
}

//点击显示预置文本的方法
function showtext(res) {
    if (useid$(res.id).value == "") {
        useid$(res.id).value = res.placeholder;
    }
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
    var geime = prompt("请输入update");
    if (geime != "update") {
        alert("输出错误！")
        return;
    }

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
                    if (tag.checked == true) { push_inside.push(arr); }
                }
                // 收集文本框
                tag = useid$("text_" + i + "_" + k + "_" + j);
                if (tag) {
                    tag.value = tag.value.replace(/\+/g, "%2B");
                    var arr = [i, k, j, tag.value, "text"];
                    if (tag.value != "") {
                        push_inside.push(arr);
                    }
                }
                //收集文本域
                tag = useid$("textarea_" + i + "_" + k + "_" + j);
                if (tag) {
                    var arr = [i, k, j, tag.value, "textarea"];
                    if (tag.value != "") { push_inside.push(arr); }
                }
            }
        }
    }

    // 获取用户基本信息
    var id = useid$("form_oid").value;
    var name = useid$("form_name").value;
    var bron = useid$("form_bron").value;
    var age = useid$("form_age").value;
    var number = useid$("form_number").value;
    var num = useid$("form_num").value;
    var today = useid$("form_today").value;
    var sex = useid$("form_sex").value;
    var patient_name = { "id": id, "name": name, "sex": sex, "bron": bron, "age": age, "number": number, "num": num, "today": today };

    var xhr = createXhr();
    xhr.open("post", "php/inside_in.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("修改成功")
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "push_inside=" + JSON.stringify(push_inside) + "&patient_name=" + JSON.stringify(patient_name) + "&what_move=" + JSON.stringify("update");
    xhr.send(push);
}

//outside_more.html的删除按钮触发的事件
function delete_form() {
    var geime = prompt("请输入delete");
    if (geime != "delete") {
        alert("输出错误！")
        return;
    }

    var id = useid$("form_oid").value;

    var xhr = createXhr();
    xhr.open("post", "php/inside_in.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "id=" + JSON.stringify(id) + "&what_move=" + JSON.stringify("delete");
    xhr.send(push);

    content_jump_src = "outside.html";
    change_src();
}

//outside_more.html的打印按钮触发的事件
function print_form() {
    window.open("print.html");//打开一个新窗口
}




