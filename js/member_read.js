var u_id; // update_if 公有變數，不會讓修改時出現

var flag_username = false;
var flag_password = false;
var flag_re_password = false;
var flag_email = false;
var flag_chk01 = false;
$(function () {

  // 監聽即時監聽 #會員帳號
  $("#username").on("input propertychange", function () {
    console.log($(this).val().length);
    if ($(this).val().length > 0 && $(this).val().length <= 30) {
      // 字數符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_username = true;
    } else {
      // 字數不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_username = false;
    }
  });

  // 監聽即時監聽 #電子郵件
  $("#email").on("input propertychange", function () {
    console.log($(this).val().length);
    if ($(this).val().length > 0 && $(this).val().length <= 30) {
      // 字數符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_email = true;
    } else {
      // 字數不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_email = false;
    }
  });

  // 監聽 switch 停權
  $("#switch01").click(function () {
    console.log($(this).is(":checked"));
    flag_chk01 = $(this).is(":checked");
    if (flag_chk01) {
      $(this).next().text("正常");
    } else {
      $(this).next().text("停權");
    }
  });

  $.ajax({
    type: "GET",
    url: "http://192.168.10.59/202312/member_read_api.php",
    dataType: "json",
    // 先串接再監聽，否則按鈕會無效
    async: false,
    success: showdata_form,
    error: function () {
      alert("http://192.168.10.59/202312/member_read_api.php");
    },
  });

  // 需要有 #mydata 讓程式找到按鈕位置
  // 監聽 #update_btn
  $("#mydata").on("click", "#update_btn", function () {
    var tr = $(this).closest("tr");
    u_id = tr.find("[data-th='會員編號']").text();
    $("#username").val(tr.find("[data-th='會員帳號']").text());
    $("#email").val(tr.find("[data-th='電子郵件']").text());
  
    // state 使用狀況
    $("input[id=switch01]").prop("checked", tr.find("[data-th='狀態']").text() === "正常");
  });

  // 監聽 #delete_btn
  $("#mydata").on("click", "#delete_btn", function () {
    if (confirm("確認刪除此筆資料嗎？")) {
      console.log($(this).data("id"));

      // 產生 json 格式的參數
      var dataJSON = {};
      dataJSON["ID"] = $(this).data("id");
      console.log(JSON.stringify(dataJSON));

      // 傳遞刪除參數至後端 api
      $.ajax({
        type: "POST",
        url: "http://192.168.10.59/202312/member_delete_api.php",
        data: JSON.stringify(dataJSON),
        dataType: "json",
        success: showdata_delete,
        error: function () {
          alert("error-http://192.168.10.59/202312/member_delete_api.php");
        },
      });
    }
  });

  // 監聽 #modal_update_btn
  $("#modal_update_btn").click(function () {

    // 產生 json 格式的參數
    var dataJSON = {};
    dataJSON["ID"] = u_id;
    dataJSON["Username"] = $("#username").val();
    dataJSON["Email"] = $("#email").val();
    dataJSON["State"] = $("#switch01").is(":checked");
    console.log(JSON.stringify(dataJSON));

    // 傳遞更新參數至後端 api
    $.ajax({
      type: "POST",
      url: "http://192.168.10.59/202312/member_update_api.php",
      data: JSON.stringify(dataJSON),
      dataType: "json",
      success: showdata_update,
      error: function () {
        alert("error-http://192.168.10.59/202312/member_update_api.php");
      },
    });
  });
});

function showdata_form(data) {
  console.log(data);

  $("#mydata").empty();
  data.data.forEach(function (item) {
    console.log(item.Pname);
    // data-id="' + item.ID + '" 讓值藏在按鈕裡
    var strHTML =
      '  <tr><td data-th="會員編號">' +
      item.ID +
      '</td><td data-th="會員帳號">' +
      item.Username +
      '</td><td data-th="電子郵件">' +
      item.Email +
      '</td><td data-th="狀態">' +
      item.State +
      '</td><td data-th="建立日期">' + item.Created_at + '</td> <td class="text-center"><button class="btn btn-success text-center"  data-bs-toggle="modal" data-bs-target="#updateModal" data-id="' + item.ID + '" data-username="' + item.Username + '" data-email="' + item.Email + '" data-state="' + item.State + '"  id="update_btn">修改</button></td><td class="text-center"><button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal" data-id="' + item.ID + '" id="delete_btn">刪除</button></td></tr>';
    $("#mydata").append(strHTML);
  });
}

function showdata_update(data) {
  console.log(data);
  if (data.state) {
    // 更新成功
    alert(data.message);
    // 頁面重整
    location.href = "ideal_admin_member.html";
  } else {
    // 更新失敗
    alert(data.message);
  }
}

function showdata_delete(data) {
  console.log(data);
  if (data.state) {
    // 刪除成功
    alert(data.message);
    // 頁面重整
    location.href = "ideal_admin_member.html";
  } else {
    // 刪除失敗
    alert(data.message);
  }
}
