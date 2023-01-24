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

$(document).on('click', "#addToCartBtn", function() {
    const userid = $(this).data('user');
    const productid = $(this).data('id');
    const quantity = $('#quantity').val();

    $.post("/addToCart", {user: userid, product: productid, quantity: quantity}, (response) => {
        alert("Product added to cart!");
    })

    
})
    