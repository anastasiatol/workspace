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
            
            // create modalwindow
            var divModalBack = document.createElement('div');
            var divModal = document.createElement('div');
            $(divModalBack).addClass("modalWindow");
            $(divModal).addClass("modalContent");
            var photo = document.createElement("img");
            photo.src = image.src;
            $(divModal).append(photo);
            var divInformation=document.createElement('div');
            var p1 = document.createElement('p');
            p1.innerText = image.name;
            var p2 = document.createElement('p');
            p2.innerText = image.surname;
            var p3 = document.createElement('p');
            p3.innerText = image.sex;
            $(divInformation).append(p1);
            $(divInformation).append(p2);
            $(divInformation).append(p3);
            $(divModal).append(divInformation);
            var divRole = document.createElement('div');
            divRole.innerHTML = image.role;
            $(divModal).append(divRole);
            $(divModalBack).append(divModal);
            $(div).append(divModalBack);
 //           var buttonClose = document.createElement('span');
 //           buttonClose.innerHTML = 'close';
 //           $(buttonClose).click (function (){
 //               closeModalWindow(event);
 //            });
 //           $(divModal).append(buttonClose);
                        
            $(div).click (function (){
                openModalWindow(event);
            });
            $(".employees").append(div);
        });
    }
}

function openModalWindow(ev){
    var targetModal = ev.target;
    targetModal.lastElementChild.style.display = "block";
}
//function closeModalWindow(ev){
//    var targetModal = ev.target;
//    targetModal.parentElement.style.display = "none";
//}


$(document).ready(function () {
    renderGallery();
});