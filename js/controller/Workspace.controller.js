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

        $scope.createEmployee = function () {
            $scope.selectedEmployee = {};
            $scope.showEmployeeEditDialog = true;
        }

        $scope.$on('deleteEmployee', function (event) {
            $scope.employeeList.splice($scope.employeeList.indexOf($scope.selectedEmployee), 1);
            $scope.showEmployeeInfoDialog = false;
        })

        $scope.$on('openModalEdit', function (event) {
            $scope.showEmployeeEditDialog = true;
        })

        $scope.$on('resetEmployeeData', function (event) {
            $scope.selectedEmployee = $scope.selectedEmployeeInitialData;
            updateEmployee($scope.selectedEmployeeInitialData);
            console.log($scope.employeeList);
        });

        $scope.$on('saveEmployeeData', function (event, selectedEmployee) {
            updateEmployee(selectedEmployee);
        })

        var updateEmployee = function (employee) {
            var employeeToUpdate = $scope.employeeList.find(function (currentEmployee) {
                    return currentEmployee.id == employee.id
                })
                if (employeeToUpdate) {
                    employeeToUpdate.name = employee.name;
                    employeeToUpdate.surname = employee.surname;
                    employeeToUpdate.id = employee.id;
                    employeeToUpdate.role = employee.role;
                    employeeToUpdate.sex = employee.sex;
                    employeeToUpdate.src = employee.src;
                } else {
                    console.log(employee);
                    $scope.employeeList.push(employee);
                    var newId = $scope.employeeList[$scope.employeeList.length - 1].id + 1;
                    $scope.employeeList.employee.id = newId;
                }
        }

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
                    if (employeeInfo.$valid){
                        $scope.showEmployeeEditDialog = false;
                        $scope.$emit('saveEmployeeData', $scope.selectedEmployee);
                    }
                }
            }
        }
    });
