$(function () {
  $.ajax({
    type: "GET",
    url: "http://192.168.10.59/202312/admin_product_read_api.php",
    dataType: "json",
    success: function (data) {
      showdataList(data);
    },
    error: function () {
      alert("error-admin_product_read_api.php");
    },
  });
});

function showdataList(data) {
  $("#mylist").empty();
  data.forEach(function (product, index) {
    var productType = product.Ptype;
    var productCount = product.count; 
    console.log(product.count);

    var strHTML =
      '<li class="list-group-item" data-key="' +
      index +
      '"><div class="d-flex"><div>' +
      productType +
      '</div><span class="badge text-bg-secondary ms-auto">' +
      productCount +
      "</span></div></li>";
    $("#mylist").append(strHTML);
  });
}
