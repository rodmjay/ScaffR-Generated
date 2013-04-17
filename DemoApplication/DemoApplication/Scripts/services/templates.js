﻿/// <reference path="../global/global.angular.js" />

Application.Services.factory('templates', function ($resource) {

    // TODO: Change with WebApi endpoint
    var endPoint = $resource('/Scripts/mock-data/templates/:file.js', {}, {
        get: { method: 'GET', params: { file: '@file' } },
        getSummary: { method: 'GET', params: { file: '@file' }, isArray: true },
    });

    return {
        getById: function (id) {
            return endPoint.get({ file: "template" });
        },

        getSummary: function () {
            return endPoint.getSummary({ file: "summary" });
        },

        save: function (name, tasks) {
            // TODO: Add logic to save the template
        }
    };
});