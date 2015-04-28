angular.module('TitlesController', ['titlesService'])
.controller('TitlesController',

    function(TitlesFactory, $scope, $stateParams, $location, $http)
    {
        "use strict";
        var vm = this;
        vm.processing = true;

        TitlesFactory.all().success(function(data)
        {
            vm.processing = false;
            vm.titles = data;
        });
    });
