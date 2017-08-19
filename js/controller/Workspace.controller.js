angular.module("workspaceApp")
    .controller("WorkspaceController", function ($scope, $http) {
        var getEmployeeList = function () {
            getEmployeeListFromServer().then(function (response) {
                console.log(response.data);
                $scope.employeeList = response.data;

                $scope.$apply();
            })
        }

        var getEmployeeListFromServer = function () {
            return $http.get("./js/employeeList.json");
        }
        $scope.openModalWindow = function (event) {

        };
        $scope.deleteEmployee = function () {
            var index = this.employeeList.indexOf(this.employeeList.find(function (element) {
                return element.id == idNumber
            }))
            this.employeeList.splice(index, 1);

            $(".modalWindow").remove();
            renderEmployeeList(this.employeeList);
        }
        getEmployeeList();
    });
