// print.js

//print.html加载时调用的资料加载方法
function load_message() {
    var id;
    var find = "id=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        ca[i] = ca[i].trim();
        if (ca[i].indexOf(find) == 0) {
            id = ca[i].substring(find.length, ca[i].length);
        }
    }
    var xhr = createXhr();
    xhr.open("post", "php/inside_in.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var arr = JSON.parse(xhr.responseText);
            load_patient_message(arr[0]);
            load_sick_message(arr);
        }
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var push = "id=" + JSON.stringify(id) + "&what_move=" + JSON.stringify("print");
    xhr.send(push);
}

//print.html输出基本信息
function load_patient_message(arr) {
    useid$("span_name").innerHTML = arr['name'];
    useid$("span_sex").innerHTML = arr['sex'];
    useid$("span_age").innerHTML = arr['age'];
    useid$("span_inday").innerHTML = arr['today'];
}

//print.html
var print_title = "";
var ying_count = 0;// 印象：提示的排序序号
function load_sick_message(arr) {
    var arr_title = arr[arr.length - 1];
    for (var i = 1; i < arr.length - 1; i++) {
        var kind_one = arr[i]['kind_one'];
        var kind_two = arr[i]['kind_two'];
        var kind_thr = arr[i]['kind_thr'];
        var invalue = arr[i]['invalue'];
        var div_id = "div_" + kind_one + "_" + kind_two;

        //建立以第二类别为一组的div
        if (useid$(div_id)) { }//如果已经有则不建立
        else {//没有则建立
            for (var k = 0; k < arr_title.length; k++) {//根据当前病患的其中一条信息，寻找该信息对应的标题
                if (kind_two == arr_title[k]['kind_two']) {//判断是不是同一二类
                    if (arr_title[k]['kind_thr'] == 1) {//同一二类则输出位于第一个的inhtml（根据标题的不同可能需要不同方法输出）
                        print_title = arr_title[k]['inhtml'];
                        if (print_title == "自发性眼震:") {
                            useid$("all").innerHTML += "<div id='" + div_id + "' class='box box_show kind_one'></div>"
                        } else if (print_title == "冷热试验:") {
                            useid$("all").innerHTML += "<div id='" + div_id + "' class='box show_table hot_cold'></div>"
                        } else if (print_title == "印象：提示") {
                            useid$("all").innerHTML += "<div id='" + div_id + "' class='box show_table'></div>"
                        } else {
                            useid$("all").innerHTML += "<div id='" + div_id + "' class='box box_show'></div>"
                        }
                        useid$(div_id).innerHTML += "<span class='head'>" + arr_title[k]['inhtml'] + "</span>";
                    }
                }
            }
        }
        console.log(print_title)
        if (print_title == "冷热试验:") {
            if (kind_thr == 2) {
                var table_id = "table1"
                useid$(div_id).innerHTML += "<table id='" + table_id + "' cellspacing='0' class='hot-cold-table'></table>";
                useid$(table_id).innerHTML += "<tr class='hot-cold-tr' style='font-weight: bolder;'><th>&nbsp;</th><th>SPV[°/S]</th><th>固视抑制指数</th><th>&nbsp;</th><th>SPV[°/S]</th><th>固视抑制指数</th></tr>"
                useid$(table_id).innerHTML += "<tr id='table1_tr1' class='hot-cold-tr'><th style='font-weight: bolder;'>右冷(44℃)</th><th>" + invalue + "</th></tr>"
            }
            if (kind_thr == 3) {
                useid$("table1_tr1").innerHTML += "<th>" + invalue + "</th>"
            } if (kind_thr == 4) {
                useid$("table1_tr1").innerHTML += "<th style='font-weight: bolder;'>左冷(44℃)</th><th>" + invalue + "</th>"
            } if (kind_thr == 5) {
                useid$("table1_tr1").innerHTML += "<th>" + invalue + "</th>"
            } if (kind_thr == 6) {
                useid$(table_id).innerHTML += "<tr id='table1_tr2' class='hot-cold-tr'><th style='font-weight: bolder;'>右热(30℃)</th><th>" + invalue + "</th></tr>"
            } if (kind_thr == 7) {
                useid$("table1_tr2").innerHTML += "<th>" + invalue + "</th>"
            } if (kind_thr == 8) {
                useid$("table1_tr2").innerHTML += "<th style='font-weight: bolder;'>左热(30℃)</th><th>" + invalue + "</th>"
            } if (kind_thr == 9) {
                useid$("table1_tr2").innerHTML += "<th>" + invalue + "</th>"
            }
        } else if (print_title == "印象：提示") {
            if (ying_count == 0) {
                var table_id = "table2"
                useid$(div_id).innerHTML += "<table id='" + table_id + "' cellspacing='0' class='tip-table'></table>";
            }
            ying_count = ying_count + 1;
            useid$(table_id).innerHTML += "<th class='tip-t'><th style='width: 30px;'></th><th style='width: 30px;'>"+ying_count+".</th><th>" + invalue + "</th></tr>";
        } else {
            useid$(div_id).innerHTML += "<span class='second_span'>" + invalue + "</span>";
        }
    }
}

