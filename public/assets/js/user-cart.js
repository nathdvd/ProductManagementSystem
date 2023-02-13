
document.addEventListener('DOMContentLoaded', (event) => {
    let total = 0;
    let quantities = $(".item-quantities");
    let prices = $(".item-prices");

    for(let i = 0; i < quantities.length; i++) {
        total += (parseFloat(prices[i].innerText) * parseInt(quantities[i].innerText));
    }

    $("#totalAmount").text(total.toFixed(2));
});

$(document).on("click", "#placeOrderBtn", async function() {
    const userid = $(this).data('user');
    const loc = parseInt($("#location").val());
    let cart = $(this).data("cart");
    if(userid == "") alert("You are not logged in.");
    else if (cart.length < 1) alert("Cart is empty.");
    else {
        await $.post("/placeOrder", {user: userid, cart: JSON.stringify(cart), location: loc}).then(() => {
            alert("Your order has been placed! Please check the Orders tab for tracking.");
            location.reload();
        });
    }
});

$(document).on("click", "#clearCartBtn", async function() {
    const userid = $(this).data('user');
    let cart = $(this).data("cart");
    if(userid == "") alert("You are not logged in.");
    else if (cart.length < 1) alert("Cart is empty.");
    else {
        await $.post("/clearCart", {}).then(() => {
            alert("Cart has been cleared.");
            location.reload();
        });
    }
});