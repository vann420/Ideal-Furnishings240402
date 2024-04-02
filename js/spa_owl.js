$(function () {
    $.ajax({
        type: "GET",
        url: "http://192.168.10.59/202312/admin_product_read_api.php",
        dataType: "json",
        success: function (data) {
            showOwl(data);

            owl = $(".owl-carousel");
            owl.owlCarousel({
                loop: true,
                margin: 10,
                nav: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 3
                    },
                }
            });

            owl.on('mousewheel', '.owl-stage', function (e) {
                if (e.originalEvent.deltaY > 0) {
                    owl.trigger('next.owl');
                } else {
                    owl.trigger('prev.owl');
                }
                e.preventDefault();
            });
        },
        error: function (xhr, status, error) {
            console.error("AJAX request error:", status, error);
        }
    });
});

function showOwl(data) {
    var filteredData = data.data.filter(function (item) {
        return item.Shelf === 'Y';
    });

    var shuffledData = filteredData.sort(() => Math.random() - 0.5).slice(0, 5);

    console.log(shuffledData);

    shuffledData.forEach(function (item) {
        // console.log(item.Pname);
        // console.log(item.Pintro);
        // console.log(item.Pimage);
        // console.log(item.Pimage);
        
        $("#s07-2_item").append('<div class="col-md-12">  <div class="bg-cover m-2 "style="background-image: url(upload/' + item.Pimage + '); height: 220px; border-radius: 5pt;"></div> <h4 class="fs-5 fw-800 ms-2 mt-3">' + item.Pname + '</h4><p class="ms-2">' + item.Pintro + '</p><h4 class="fw-800 ms-2 mt-1">$' + item.Price + '</h4></div>');
    });
}
$("#s07-2_item").empty();