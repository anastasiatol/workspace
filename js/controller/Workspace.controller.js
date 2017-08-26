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
        $scope.openModalWindow = function (employee) {
            $scope.selectedEmployee = employee;
            $scope.showEmployeeInfoDialog = true;
        };
        $scope.deleteEmployee = function () {
            this.employeeList.splice($scope.employeeList.indexOf($scope.selectedEmployee), 1);

            $scope.closeModalWindow();
        }
        getEmployeeList();
    })
    .directive('infoEmployeeModal', function () {
        return {
            templateUrl: "./js/shared/editModal/info.modal.html",
            restrict: "E",
            scope:{
                showEmployeeInfoDialog: "=",
                selectedEmployee: "="
            },
            controller: function($scope){
                $scope.onClose = function(){
                    $scope.showEmployeeInfoDialog = false;
                }
            }
        }
    })
    .directive('editEmployeeModal', function () {
        return {
            templateUrl: "./js/shared/editModal/info.modal.html",
            restrict: "E",
            scope:{
                showEmployeeEditDialog: "=",
                selectedEmployee: "="
            },
            controller: function($scope){
                $scope.onClose = function(){
                    $scope.showEmployeeEditDialog = false;
                }
            },
            controller: function($scope){
                $scope.saveEmployee = function(){
                    
            
            
                    $scope.showEmployeeEditDialog = false;
                }
            }
        }
    });
