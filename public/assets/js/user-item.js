$(document).on('change', "#quantity", function() {
    let quantity = $("#quantity").val();
    let unitprice = parseFloat($("#unitprice").text());
    let totalprice = quantity * unitprice;
    $("#totalprice").text(totalprice.toFixed(2));
});

document.addEventListener('DOMContentLoaded', (event) => {
    const rating = $("#rating").text();

    console.log(rating);
    $(function () {
        $("#stars").rateYo({
        rating: rating,
        readOnly: true
        });
    });
});

    