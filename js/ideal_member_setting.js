var u_id; //for update
var newData = [];
var oldImage; //紀錄舊圖檔名稱
var flag_upload;
var dataJSON = {};
dataJSON["ID"] = getCookie("UID02");

$(function () {
  console.log(JSON.stringify(dataJSON));
  console.log(getCookie("UID02"));

  // Read member data
  $.ajax({
    type: "POST",
    url: "member_setting_read_api.php",
    dataType: "json",
    data: JSON.stringify(dataJSON), // 將 dataJSON 物件轉換為 JSON 字符串
    success: function (data) {
      showdata_read_member(data);
    },
    error: function () {
      alert("error: Failed to connect to member_read_api.php");
    },
  });

  $("body").on("click", " #update_btn", function () {

    u_id = getCookie("UID02");
    $("#update_modal_username").val($(this).data("username"));
    $("#update_modal_email").val($(this).data("email"));
    $("#cityName").val($(this).data("city"));
    $("#areaName").val($(this).data("town"));
});

  // #update_btn modify button
 $("#modal_update_btn").click(function () {
  var dataJSON = {};
  dataJSON["ID"] = getCookie("UID02"); // 將u_id加入到dataJSON中
  dataJSON["Username"] = $("#update_modal_username").val();
  dataJSON["Email"] = $("#update_modal_email").val();
  dataJSON["City"] = $("#cityName").val();
  dataJSON["Town"] = $("#areaName").val();
  console.log(JSON.stringify(dataJSON));

  $.ajax({
    type: "POST",
    url: "/202312/member_setting_update_api.php",
    dataType: "json",
    data: JSON.stringify(dataJSON), // 將dataJSON物件轉換為JSON字符串並添加到ajax請求中
    cache: false,
    contentType: false,
    processData: false,
    success: showdata_update,
    error: function () {
      alert("/202312/member_setting_update_api.php");
      console.log(formdata);
    },
  });
});

});

function showdata_read_member(data) {
  console.log(data);
  console.log(data.data[0].ID);
  console.log(data.data[0].Email);
  console.log(data.data[0].City);
  console.log(data.data[0].Town);

  // $("#setbox").empty();
  $("#setbox").append(
    '<div class="mt-4 align-content-center">' +
      '</div><div class="col-md-12 mt-4 text-right">' +
      '<p><span class="fw-800 mt-3">會員帳號</span> ｜' +
      data.data[0].Username +
      '</p><p><span class="fw-800 mt-3">電子郵件 </span>｜' +
      data.data[0].Email +
      '</p><p><span class="fw-800 mt-3">會員屬性</span>｜一般會員</p><p><span class="fw-800 mt-3">居住地 </span>｜' +
      data.data[0].City +
      data.data[0].Town +
      '</p></div><div class="col-md-12 mt-4 text-right" id="setting_btn">' +
      '<button class="btn btn-warning btn-sm" id="update_btn" data-bs-toggle="modal" data-bs-target="#update_modal" data-username="' +
      data.data[0].Username +
      '" data-email="' +
      data.data[0].Email +
      '" data-city="' +
      data.data[0].City +
      '" data-town="' +
      data.data[0].Town +
      '"><i class="fa-solid fa-pen-to-square"></i>編輯資料</button></div>'
  );
}

function showdata_update(data) {
  if (data.state) {
    Swal.fire({
      title: data.message,
      showDenyButton: true,
      confirmButtonText: "確認",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("更新成功!", "", "success");
        location.reload();
      } else if (result.isDenied) {
        Swal.fire("更新失敗", "", "error");
      }
    });
  } else {
    alert(data.message);
  }
}
