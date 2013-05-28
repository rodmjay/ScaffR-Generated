﻿Application.Directives.directive('task', function factory() {
    return {
        restrict: 'E',
        templateUrl: '/content/templates/employee/task.html',
        scope: {
            task: '=',
            available: '=',
            assignables: '=',
            saveFn: '&',
            deleteFn: '&',
            detailsFn: '&'
        },
        replace: true,
        controller: ['$scope', '$location', 'service.task', 'toastr', function ($scope, $location, serviceTask, toastr) {
            $scope.employeeId = $scope.$parent.person.id;

            $scope.assignment = { selectedOption: undefined };
            $scope.$watch('assignment', function (newValue) {
                if (!newValue.selectedOption) return;

                $scope.task.name = newValue.selectedOption;
            }, true);

            $scope.isTeam = false;
            $scope.resolveByAll = null;
            $scope.assign = function (principalId, isTeam) {
                $scope.resolveByAll = null;

                // Handle deselecting an item
                if (principalId && $scope.task.principalId == principalId) {
                    $scope.task.principalId = null;
                    $scope.isTeam = false;
                    return;
                }

                $scope.isTeam = isTeam;
                $scope.task.principalId = principalId || $scope.$parent.person.id;
            };

            $scope.$watch('task.principalId', function (value) {
                if (value == null)
                    $scope.principal = null;
                else
                    $scope.principal = _.find($scope.assignables, function (item) { return item.id == value; });
            });

            $scope.isNew = function () {
                return $scope.task.name == null || $scope.task.principalId == null || $scope.task.dueDate == null;
            };

            $scope.newCreated = $scope.isNew();

            //
            // Button actions

            $scope.saveTask = function () {
                // TODO: Add logic for saving
                $scope.newCreated = false;
                $scope.saveFn({ task: $scope.task });
                toastr.success("Saved");
            };

            $scope.details = function () {
                $scope.detailsFn({ task: $scope.task });
            };

            $scope.deleteTask = function () {
                $scope.deleteFn({ task: $scope.task, isNew: $scope.newCreated });
            };

            $scope.editTask = function () {
                // TODO: Open the details page
            };
        }]
    };
});
