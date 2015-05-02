angular.module('ArticleDeleteController', ['ArticleService'])
.controller('ArticleDeleteController',

    function(ArticleService, $scope, $routeParams, $sce, $rootScope, $location, $http)
    {
        "use strict";
        var vm = this;
        vm.processing = true;


        ArticleService.get($routeParams.article_id).success(function(data)
        {
            console.log("Getting article for deletion...");
            console.log(data);
            vm._id = data[0]._id;
            vm.title = data[0].title;
            vm.processing = false;
        });


        $scope.deleteArticle = function()
        {
          $http.delete('/api/article/' + vm._id);
          $location.path('/titles/');
        };

    });
