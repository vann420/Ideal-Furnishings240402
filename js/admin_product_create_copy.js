var switch01 = "未上架"; //記錄上架狀態
var num01 = 1; //記錄數量
var flag_pname = false;
var flag_pintro = false;
var flag_psize = false;
var flag_price = true; //已有價格初始值
var flag_type = false;
var flag_upload = false;
var dataJSON = {};
$(function () {
  //監聽_即時監聽 #pname
  $("#pname").bind("input propertychange", function () {
    console.log($(this).val().length);
    if ($(this).val().length > 0 && $(this).val().length < 15) {
      //字數符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_pname = true;
    } else {
      //字數不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_pname = false;
    }
  });

  // 監聽_圖片 #image
  $("#fileupload").change(function () {
    console.log(fileupload);
    console.log(fileupload.files[0]);
    console.log(fileupload.files[0].name);
    console.log(fileupload.files[0].size);
    console.log(fileupload.files[0].type);
    // fileupload.files
    // 圖片於瀏覽器的暫存路徑
    console.log(URL.createObjectURL(fileupload.files[0]));

    if (
      fileupload.files[0].type == "image/jpeg" ||
      fileupload.files[0].type == "image/png"
    ) {
      // 顯示預覽圖
      $("#prevImg").removeClass("d-none");
      // attr換參數
      $("#prevImg").attr("src", URL.createObjectURL(fileupload.files[0]));
      flag_upload = true;
    } else {
      alert("圖片格式不符合");
      flag_upload = false;
    }
  });

  //監聽_即時監聽 #price
  $("#price").bind("input propertychange", function () {
    console.log($(this).val());
    if ($(this).val() > 0 && $(this).val() < 100000) {
      // 價格符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_price = true;
    } else {
      // 價格不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_price = false;
    }
  });

  //監聽_即時監聽 #type
  $("#type").bind("input propertychange", function () {
    console.log($(this).val().input);
    // 讓上方預設有is-invaild
    if ($(this).val() != "") {
      //已選擇分類
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_type = true;
    }
  });

  //監聽_即時監聽 #pintro
  $("#pintro").bind("input propertychange", function () {
    console.log($(this).val().length);
    if ($(this).val().length > 0 && $(this).val().length < 64) {
      //字數符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_pintro = true;
    } else {
      //字數不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_pintro = false;
    }
  });

  //監聽_即時監聽 #psize
  $("#psize").bind("input propertychange", function () {
    console.log($(this).val().length);
    if ($(this).val().length > 0 && $(this).val().length < 30) {
      //字數符合規定
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
      flag_psize = true;
    } else {
      //字數不符合規定
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
      flag_psize = false;
    }
  });

  // 監聽switch上架
  $("#switch01").click(function () {
    // this現在的動作
    console.log($(this).is(":checked"));
    if ($(this).is(":checked")) {
      $(this).next().text("已上架");
      switch01 = "Y";
    } else {
      $(this).next().text("未上架");
      switch01 = "未上架";
    }
  });

  // 及時監聽range #num01
  $("#num01").bind("input propertychange", function () {
    console.log($(this).val());
    $("#num01_text").text($(this).val());
    num01 = $(this).val();
  });

  // 按鈕監聽
  $("#ok_btn").click(function () {
    event.preventDefault(); // 阻止表單預設提交行為

    if (
      flag_pname &&
      flag_price &&
      flag_type &&
      flag_psize &&
      flag_pintro &&
      flag_upload &&
      switch01
    ) {




      var formdata = new FormData();
      formdata.append("file", fileupload.files[0]);
      console.log(formdata);
      // 傳遞formdata至後端api
      $.ajax({
        type: "POST",
        url: "/202312/admin_product_create_image_api.php",
        data: formdata,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: showdata_image,
        error: function () {
          alert("/202312/admin_product_create_image_api.php");
        },
      });
    } else if (!flag_upload) {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "未選取圖片!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        position: "center-center",
        icon: "error",
        title: "欄位有務請修正",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});

function showdata_image(data) {
  console.log(data);
  dataJSON["Pname"] = $("#pname").val();
  dataJSON["Price"] = $("#price").val();
  dataJSON["Pintro"] = $("#pintro").val();
  dataJSON["Num"] = num01;
  dataJSON["Shelf"] = switch01;
  dataJSON["Psize"] = $("#psize").val();
  dataJSON["Ptype"] = $("#type").val();
  dataJSON["Pimage"] = data.datainfo["name"];
  console.log(JSON.stringify(dataJSON));

  $.ajax({
    type: "POST",
    url: "http://192.168.10.59/202312/admin_product_create_api.php",
    data: JSON.stringify(dataJSON),
    contentType: "application/json;chartset=utf-8",
    dataType: "json",
    success: showdata,
    error: function () {
      alert("error-http://192.168.10.59/202312/admin_product_create_api.php");
    },
  });
}

function showdata(data) {
  if (data.state) {
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "上傳成功",
      showConfirmButton: false,
      timer: 1500,
    });

    $("#showmsg").removeClass("d-none");
    $("#showmsg").empty();
    $("#showmsg").html('<h4 class="fw-800 text-center">上傳成功</h4><div class="co1-md-10 bg-light rounded-3 p-3"><div class="row"><div class="col-md-8 mt-2 mb-2" id="showimg"><div class="pimg bg-cover justify-content-center rounded-3" style="background-image: url(/202312/upload/' + dataJSON["Pimage"] + '); height: 350px;" id="prevImg"></div></div><div class="col-md-4 mt-2"><h4 class="fw-800">' + dataJSON["Pname"] + '</h4><p>' + dataJSON["Pintro"] + '</p><p>尺寸： ' + dataJSON["Psize"] + '</p><p>價格：NT$' + dataJSON["Price"] + '</p><p>分類：<span class="badge text-bg-danger">' + dataJSON["Ptype"] + '</span></p><p>數量：' + dataJSON["Num"] + '</p><p>商店上架：' + dataJSON["Shelf"] + '</p></div></div></div><div class="text-center mt-3"><a href="/202312/ideal_admin_index.html" class="btn btn-secondary m-1">返回主頁</a><a href="/202312/ideal_admin_product.html" class="btn btn-secondary m-1">查看列表</a></div>');
  } else {
    Swal.fire({
      position: "center-center",
      icon: "error",
      title: data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}




