
document.addEventListener('DOMContentLoaded', (event) => {
    let total = 0;
    let quantities = $(".item-quantities");
    let prices = $(".item-prices");

    for(let i = 0; i < quantities.length; i++) {
        total += (parseFloat(prices[i].innerText) * parseInt(quantities[i].innerText));
    }

    $("#totalAmount").text(total.toFixed(2));
});