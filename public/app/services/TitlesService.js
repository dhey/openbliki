angular.module('TitlesService', [])
.factory('TitlesService', function($http)
{
    "use strict";

    var titlesFactory = {};

    // Get all articles:
    titlesFactory.all = function() 
    {
        return $http.get('/api/titles/');
    };

    return titlesFactory;

});