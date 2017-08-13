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
            $(img).addClass("small");
            var div = document.createElement('div');
            $(div).addClass("whitebox");
            $(div).append(img);
            var h2 = document.createElement('h2');
            h2.innerText = image.name + ' ' + image.surname;
            $(div).append(h2);
            $(".employees").append(div);
        });
    }
}

$(document).ready(function () {
    renderGallery();
});