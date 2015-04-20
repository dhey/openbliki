angular.module('articleService', [])

.factory('ArticleFactory', function($http) {

    // Create the object:
    var articleFactory = {};

    // Get a single article:
    articleFactory.get = function(id) {
        return $http.get('/api/article/' + id);
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

