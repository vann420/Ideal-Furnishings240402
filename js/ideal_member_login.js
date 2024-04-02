var flag_username = false;
var flag_password = false;
var flag_re_password = false;
var flag_email = false;
var flag_chk01 = false;

$(function () {

    // 判斷是否登入
    if (getCookie("UID01") != "") {
        // UID01存在，傳至後端api判斷是否合法
        var dataJSON = {};
        dataJSON["UID01"] = getCookie("UID01");
        $.ajax({
            type: "POST",
            url: "member_check_UID_api.php",
            data: JSON.stringify(dataJSON),
            dataType: "json",
            success: showdata_check_UID,
            error: function () {
                alert("error-member_check_UID_api.php");
            }
        });
    }

    // 登出按鈕監聽 #logout_btn
    $("#logout_btn").click(function () {
        setCookie("UID01", "", 7);
        location.href = "20231228-1-spa.html";
    });

    //即時監聽 #username
    $("#username").bind("input propertychange", function () {
        // console.log($(this).val().length); is-invalid
        if ($(this).val().length > 7 && $(this).val().length < 13) {
            //符合規定，傳至後端檢查帳號是否存在
            var dataJSON = {};
            dataJSON["Username"] = $("#username").val();
            console.log(JSON.stringify(dataJSON));

            $.ajax({
                type: "POST",
                url: "member_check_uni_api.php",
                data: JSON.stringify(dataJSON),
                dataType: "json",
                success: showdata_check_uni,
                error: function () {
                    alert("error-member_check_uni_api.php");
                }
            });

            // $(this).removeClass('is-invalid');
            // $(this).addClass('is-valid');
            // flag_username = true;
        } else {
            //不符合規定
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            flag_username = false;
        }
    });

    //即時監聽 #email
    $("#email").bind("input propertychange", function () {
        // console.log($(this).val().length); is-invalid
        if ($(this).val().length > 7 && $(this).val().length < 21) {
            //符合規定
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
            flag_email = true;
        } else {
            //不符合規定
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            flag_email = false;
        }
    });

    //即時監聽 #password
    $("#password").bind("input propertychange", function () {
        // console.log($(this).val().length); is-invalid
        if ($(this).val().length > 7 && $(this).val().length < 13) {
            //符合規定
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
            flag_password = true;
        } else {
            //不符合規定
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            flag_password = false;
        }
    });

    //即時監聽 #re_password
    $("#re_password").bind("input propertychange", function () {
        if ($(this).val() == $("#password").val()) {
            //符合規定
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
            flag_re_password = true;
        } else {
            //不符合規定
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
            flag_re_password = false;
        }
    });

    //監聽 checkbox #chk01
    $("#chk01").change(function () {
        if ($(this).is(":checked")) {
            //console.log("遵守");
            flag_chk01 = true;
        } else {
            //console.log("不遵守");  
            flag_chk01 = false;
        }

    });

    // 註冊按鈕監聽
    $("#reg_btn").click(function () {
        if (flag_username && flag_password && flag_re_password && flag_email && flag_chk01) {
            // {"Username":"xxx", "Password":"xxx", "Email":"xxx"}

            var dataJSON = {};
            dataJSON["Username"] = $("#username").val();
            dataJSON["Password"] = $("#password").val();
            dataJSON["Email"] = $("#email").val();
            console.log(JSON.stringify(dataJSON));


            // 傳至後端執行註冊
            $.ajax({
                type: "POST",
                url: "member-create-api.php",
                data: JSON.stringify(dataJSON),
                dataType: "json",
                success: showdata,
                error: function () {
                    alert("error-member-create-api.php");
                }
            });

        } else {
            // alert("內容有誤請修正");
            Swal.fire({
                position: "center-center",
                icon: "error",
                title: "內容有誤請修正",
                showConfirmButton: false,
                timer: 1500
            });
        }

    });

    //登入按鈕監聽 #login_btn
    $("#login_btn").click(function () {
        // console.log($("#login_username").val()+$("#login_password").val());
        // {"Username":"XX", "Password":"XXX"}
        var dataJSON = {};
        dataJSON["Username"] = $("#login_username").val();
        dataJSON["Password"] = $("#login_password").val();
        // console.log(JSON.stringify(dataJSON));

        //傳遞至後端執行登入行為
        $.ajax({
            type: "POST",
            url: "member_login_api.php",
            data: JSON.stringify(dataJSON),
            dataType: "json",
            success: showdata_login,
            error: function () {
                alert("error-member_login_api.php");
            }
        });
    });

});

function showdata(data) {
    console.log(data);
    if (data.state) {
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "(data.message)",
            showConfirmButton: false,
            timer: 1500
        });

        // 註冊成功後直接進行登入
        loginUser($("#username").val(), $("#password").val());
    } else {
        alert(data.message);
    }
}

function loginUser(username, password) {
    var dataJSON = {};
    dataJSON["Username"] = username;
    dataJSON["Password"] = password;


    // 傳遞至後端執行登入行為
    $.ajax({
        type: "POST",
        url: "member_login_api.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata_login,
        error: function () {
            alert("error-member_login_api.php");
        }
    });
}


function showdata_check_uni(data) {
    console.log(data);
    if (data.state) {
        // 帳號不存在，可以使用
        $("#username").removeClass('is-invalid');
        $("#username").addClass('is-valid');
        flag_username = true;
    } else {
        // 帳號存在，不可以使用
        $("#username").removeClass('is-valid');
        $("#username").addClass('is-invalid');
        flag_username = false;
    }
}

function showdata_login(data) {
    console.log(data);
    if (data.state) {
        // alert(data.message);
        // 將modal視窗關閉
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "已登入",
            showConfirmButton: false,
            timer: 1500,
            willClose: function () {
                // 在 Swal 將要關閉時，關閉模態窗口
                $("#registerModal").modal("hide"); // 請將 "yourModalID" 替換為你的模態窗口的 ID
            }
        });

        // console.log(data.data[0].UID01);
        var uid01 = data.data[0].UID01;
        var uid02 = data.data[0].ID;
        setCookie("UID01", uid01, 7);
        setCookie("UID02", uid02, 7);

        // 登入nav
        $("#loginModal").modal("hide");
        $("#user_message").text("您好，" + data.data[0].Username + "！");
        $("#nav_log_btn").addClass('d-none');
        $("#nav_reg_btn").addClass('d-none');
        $("#member_list").removeClass('d-none');


        // 顯示高級功能
        $("#member_btn01").removeClass('disabled');
        $("#member_btn02").removeClass('disabled');
        $("#member_btn03").removeClass('disabled');

        // s11表單資訊
        // $("#s11_form").removeClass('d-none');
        // $("#s11_map").removeClass('col-md-12');
        // $("#s11_map").addClass('col-md-6');
    } else {
        alert(data.message);
    }
}

function showdata_check_UID(data) {
    console.log(data);
    if (data.state) {
        var uid02 = data.data[0].ID;
        setCookie("UID02", uid02, 7);

        // 驗證成功  登入nav
        $("#loginModal").modal("hide");
        $("#user_message").text("您好，" + data.data[0].Username + "！");
        $("#nav_log_btn").addClass('d-none');
        $("#nav_reg_btn").addClass('d-none');
        $("#member_list").removeClass('d-none');

        // 顯示高級功能
        $("#member_btn01").removeClass('disabled');
        $("#member_btn02").removeClass('disabled');
        $("#member_btn03").removeClass('disabled');

        // s11表單資訊
        // $("#s11_form").removeClass('d-none');
        // $("#s11_map").removeClass('col-md-12');
        // $("#s11_map").addClass('col-md-6');
    }
}