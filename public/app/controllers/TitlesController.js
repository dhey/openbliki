angular.module('TitlesController', ['TitlesService'])
.controller('TitlesController',

    function(TitlesService, $scope, $stateParams, $location, $http)
    {
        "use strict";
        var vm = this;
        vm.processing = true;

        TitlesService.all().success(function(data)
        {
            vm.processing = false;
            vm.titles = data;
        });
    });
