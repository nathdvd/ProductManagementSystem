function getImagePreview(event) {
    FILE = event.target.files[0];
    var image = URL.createObjectURL(FILE);
    var img_tag = document.getElementById('product-image-preview');
    img_tag.src = image;
}

$(document).on('click', '.updateBtn', function() {
    const product = $(this).data('id');
    $("#edit-name").val(product.name);
    $("#edit-desc").val(product.description);
    $("#edit-store").val(product.retail_store_id);
    $("#edit-price").val(product.price);
    $("#edit-stock").val(product.stock);
    const img_tag = document.getElementById('edit-img-preview');
    img_tag.src = product.image_url;
    const editForm = document.getElementById("editProductForm");
    editForm.setAttribute("action", "/editProduct/"+product.id);
});

$(document).on('click', '.deleteBtn', function() {
    const id = $(this).data('id');
    if(confirm("Delete product?")) {
        const form = document.createElement('form');
        form.method = "POST";
        form.action = "/deleteProduct/"+id;
        
        document.body.appendChild(form);
        form.submit();
        
    }
});