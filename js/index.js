function getEmployeeListFromServer() {
    return $.get("js/employeeList.json");
}

function employeeList() {
        getEmployeeListFromServer().then(function (data) {
        renderEmployeeList(data);
        this.employeeList = data;
    }.bind(this))
}

function renderEmployeeList(employeeList) {
     if (employeeList) {
        employeeList.forEach(function (employee) {
            var img = document.createElement("img");
            img.src = employee.src;
            $(img).addClass("small");
            var div = document.createElement('div');
            $(div).addClass("whitebox");
            $(div).append(img);
            $(div).attr('id',employee.id)
            var h2 = document.createElement('h2');
            h2.innerText = employee.name + ' ' + employee.surname;
            $(div).append(h2);
            $(".employees").append(div);                       
            $(div).click (function (){
                openModalWindow(event);
            });
            $(".employees").append(div);
        });
    }
}

function openModalWindow(ev){
    var idNumber = ev.target.id;
    employeeList.forEach (function (employee) {
        if (employee.id == idNumber) {
            var divModalBack = document.createElement('div');
            var divModal = document.createElement('div');
            $(divModalBack).addClass("modalWindow");
            $(divModal).addClass("modalContent");
            var photo = document.createElement("img");
            photo.src = employee.src;
            $(divModal).append(photo);
            var divInformation=document.createElement('div');
            var p1 = document.createElement('p');
            p1.innerText = employee.name;
            var p2 = document.createElement('p');
            p2.innerText = employee.surname;
            var p3 = document.createElement('p');
            p3.innerText = employee.sex;
            $(divInformation).append(p1);
            $(divInformation).append(p2);
            $(divInformation).append(p3);
            $(divModal).append(divInformation);
            var divRole = document.createElement('div');
            divRole.innerHTML = employee.role;
            $(divModal).append(divRole);
            $(divModalBack).append(divModal);
            var buttonClose = document.createElement('span');
            buttonClose.innerHTML = 'close';
            $(buttonClose).click (function (){
                $(".modalWindow").remove();
            });
            $(divModal).append(buttonClose);
            $(".modal").append(divModalBack);
        }
    })
}
//function closeModalWindow(ev){
//    var targetModal = ev.target;
//    targetModal.parentElement.style.display = "none";
//}


$(document).ready(function () {
    employeeList();
});