function getImagesFromServer() {
    return $.get("js/images.json");
}

function renderGallery() {
        getImagesFromServer().then(function (data) {
        renderImageCollection(data);
        this.images = data;
    }.bind(this))
}

function renderImageCollection(images) {
     if (images) {
        images.forEach(function (image) {
            var img = document.createElement("img");
            img.src = image.src;
            $(".employees").append(img);
        });
    }
}

$(document).ready(function () {
    renderGallery();
});