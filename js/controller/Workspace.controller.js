angular.module("workspaceApp")
    .controller("WorkspaceController", function ($scope, $http) {
        $scope.showEmployeeEditDialog = false;
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
            $scope.selectedEmployeeInitialData = angular.copy(employee);
            $scope.selectedEmployee = employee;
            $scope.showEmployeeInfoDialog = true;
        };

        $scope.$on('deleteEmployee', function (event) {
            $scope.employeeList.splice($scope.employeeList.indexOf($scope.selectedEmployee), 1);
            $scope.showEmployeeInfoDialog = false;
        })
   
        $scope.$on('openModalEdit', function (event) {
            $scope.showEmployeeEditDialog = true;
        })
    
        $scope.$on('resetEmployeeData', function (event){
            $scope.selectedEmployee = $scope.selectedEmployeeInitialData;
        })

        getEmployeeList();
    })
    .directive('infoEmployeeModal', function () {
        return {
            templateUrl: "./js/shared/editModal/info.modal.html",
            restrict: "E",
            transclude: true,
            scope: {
                showEmployeeInfoDialog: "=",
                showEmployeeEditDialog: "=",
                selectedEmployee: "="
            },
            controller: function ($scope) {
                $scope.onClose = function () {
                    $scope.showEmployeeInfoDialog = false;
                };
                $scope.openModalEdit = function () {
                    $scope.showEmployeeInfoDialog = false;
                    $scope.$emit('openModalEdit');
                };
                $scope.deleteEmployee = function () {
                    $scope.$emit('deleteEmployee');
                }
            }
        }
    })
    .directive('editEmployeeModal', function () {
        return {
            templateUrl: "./js/shared/editModal/edit.modal.html",
            restrict: "E",
            scope: {
                showEmployeeEditDialog: "=",
                selectedEmployee: "="
            },
            link: function (scope) {
                console.log(scope);
            },
            controller: function ($scope) {
                console.log($scope);

                $scope.onClose = function () {
                    $scope.showEmployeeEditDialog = false;
                }

                $scope.cancelChanges = function () {
                    $scope.showEmployeeEditDialog = false;
                    $scope.$emit('resetEmployeeData');
                }
                $scope.saveEmployee = function () {
                    $scope.showEmployeeEditDialog = false;
                }
            }
        }
    });
