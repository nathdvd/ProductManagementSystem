function getImagePreview(event) {
    FILE = event.target.files[0];
    var image = URL.createObjectURL(FILE);
    var img_tag = document.getElementById('product-image-preview');
    img_tag.src = image;
}