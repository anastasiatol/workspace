function getEmployeeListFromServer() {
    return $.get("js/employeeList.json");
}

function getEmployeeList() {
    getEmployeeListFromServer().then(function (data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        renderEmployeeList(data);
        this.employeeList = data;
    }.bind(this))
    //    var employeeList = getEmployeeListFromServer().then(function (data) {
    //        employeeList = JSON.parse(data);
    //        renderEmployeeList(employeeList);
    //    })
}

function renderEmployeeList(employeeList) {
    $(".employees").empty();
    if (employeeList) {
        employeeList.forEach(function (employee) {
            var img = document.createElement("img");
            img.src = employee.src;
            $(img).addClass("small");
            var div = document.createElement('div');
            $(div).addClass("whitebox");
            $(div).append(img);
            $(div).attr('id', employee.id)
            var h2 = document.createElement('h2');
            h2.innerText = employee.name + ' ' + employee.surname;
            $(div).append(h2);
            $(".employees").append(div);
            $(".whitebox").click(function () {
                openModalWindow(event);
            });
            $(".employees").append(div);
        });
    }
}

function openModalWindow(ev) {
    var idNumber = ev.target.id;
    employeeList.forEach(function (employee) {
        if (employee.id == idNumber) {
            var divModalBack = document.createElement('div');
            var divModal = document.createElement('div');
            $(divModalBack).addClass("modalWindow");
            $(divModal).addClass("modalContent");

            var buttonClose = document.createElement('span');
            buttonClose.innerHTML = '&times';
            $(buttonClose).click(function () {
                $(".modalWindow").remove();
            });
            $(divModal).append(buttonClose);

            var part1 = document.createElement("div");
            $(part1).addClass("modalForm");
            var photo = document.createElement("img");
            photo.src = employee.src;
            $(part1).append(photo);
            var divInformation = document.createElement('div');
            $(divInformation).addClass("information");
            var p1 = document.createElement('p');
            p1.innerText = employee.name;
            var p2 = document.createElement('p');
            p2.innerText = employee.surname;
            var p3 = document.createElement('p');
            p3.innerText = employee.sex;
            $(divInformation).append(p1);
            $(divInformation).append(p2);
            $(divInformation).append(p3);
            $(part1).append(divInformation);
            $(divModal).append(part1);

            var part2 = document.createElement('div');
            $(part2).addClass("modalForm");
            part2.innerHTML = employee.role;
            $(divModal).append(part2);

            var part3 = document.createElement("div");
            $(part3).addClass("modalForm");
            var divEdit = document.createElement('div');
            $(divEdit).addClass("button");
            divEdit.innerHTML = 'edit';
            $(divEdit).click(function () {
                editEmployee(idNumber)
            }.bind(this));
            $(part3).append(divEdit);
            var divDelete = document.createElement('div');
            divDelete.innerHTML = 'delete';
            $(divDelete).click(function () {
                deleteEmployee(idNumber)
            }.bind(this));
            $(divDelete).addClass("button");
            $(part3).append(divDelete);
            $(divModal).append(part3);

            $(divModalBack).append(divModal);
            $(".modal").append(divModalBack);
        }
    })
}

function deleteEmployee(idNumber) {

    var index = this.employeeList.indexOf(this.employeeList.find(function (element) {
        return element.id == idNumber
    }))
    this.employeeList.splice(index, 1);

    $(".modalWindow").remove();
    renderEmployeeList(this.employeeList);
}

function editEmployee(idNumber) {

}

$(document).ready(function () {
    getEmployeeList();
});
