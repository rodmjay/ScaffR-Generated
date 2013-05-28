﻿Application.Services.factory('service.assignment', ['$http', function ($http) {
    return {
        getEmpty: function () {
            return {
                id: 0,
                name: null,
                description: null,
                dueDate: null,
                completedDate: null,
                isDone: null,
                principalId: null,
                principalIsTeam: null,
                resolvedByOne: null,
                employeeId: null,
                categoryId: null
            };
        },

        getById: function (id, callback) {
            $http.get('/api/assignment/?id=' + id).success(callback);
        },

        add: function (entity, callback) {
            $http.put('/api/assignment', entity).success(callback);
        },

        update: function (entity, callback) {
            $http.post('/api/assignment', entity).success(callback);
        },

        delete: function (id, callback) {
            $http.delete('/api/assignment/?id=' + id).success(callback);
        }
    };
}]);