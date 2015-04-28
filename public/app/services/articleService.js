/*global angular */
angular.module('articleService', [])
.factory('ArticleFactory', function($http) {
    "use strict";

    // Create the object:
    var articleFactory = {};

    // Get a single article:
    articleFactory.get = function(id) {
        var returnValue = $http.get('/api/article/' + id);
        console.log('articleService got ' + returnValue + ' for ID ' + id);
        return returnValue;
    };

    // Get all articles:
    articleFactory.all = function() {
        return $http.get('/api/article/');
    };

    // Create an article:
    articleFactory.create = function(userData) {
        return $http.post('/api/article/', userData);
    };

    return articleFactory;
});

