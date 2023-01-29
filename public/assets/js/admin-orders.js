$(document).on('change', ".order-status", function() {
    const orderid = $(this).data('id');
    const status = $(this).val();
    $.post("/updateOrderStatus", { id: orderid, status: status }).then(() => {
        alert("Status of ORDER " + orderid + " was updated to " + status + ".");
    })
});