var selected_cityName; //已選取的縣市
var selected_townName; //已選取的鄉鎮區
var map;
var markers;
$(function () {
   

    // 載入縣市資料
    axios.get('js/CityCountyData.json')
        .then(function (response) {
            // handle success
            console.log(response.data);
            cityCountyData = response.data;

            $("#cityName").empty();
            $("#cityName").append('<option selected disabled>選擇縣市</option>');
            response.data.forEach(function (item) {
                var strHTML = '   <option value="' + item.CityName + '"  >' + item.CityName + '</option>';
                $("#cityName").append(strHTML);
            });
        })

        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });


    // 監聽縣市選單
    $("#cityName").change(function () {
        console.log($(this).val());
        selected_cityName = $(this).val();
        console.log(cityCountyData);
        cityCountyData.forEach(function (item) {
            if (item.CityName == selected_cityName) {
                $("#areaName").empty();
                $("#areaName").append('<option selected disabled>選擇鄉鎮區</option>');
                item.AreaList.forEach(function (area) {
                    var strHTML = '   <option value="' + area.AreaName + '"  >' + area.AreaName + '</option>';
                    $("#areaName").append(strHTML);
                });
            }
        });
    });

    // 監聽鄉鎮區選單
    $("#areaName").change(function () {
        console.log($(this).val());
        selected_townName = $(this).val()

  
    });
});


