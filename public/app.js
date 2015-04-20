/*global angular */
var app = angular.module('userApp', [
	'ngAnimate',
	'app.routes',
	'authService',
	'mainCtrl',
	'userCtrl',
	'userService',
    'composeCtrl',
    'yaru22.md',
    'ui.router',
    'PostsCtrl',
    'articleService',
    'ngSanitize'
	])

// Application configuration to integrate the authenitcation token into 
// requests:
.config (function($httpProvider)
{
    "use strict";

	// Attach our auth interceptor to the HTTP requests:
	$httpProvider.interceptors.push('AuthInterceptor');
});

app.factory('posts', [function()
{
    "use strict";

    var o =
    {
        posts: [
        {title: 'post 1', upvotes: 5},
        {title: 'post 2', upvotes: 2},
        {title: 'post 3', upvotes: 15},
        {title: 'post 4', upvotes: 9},
        {title: 'post 5', upvotes: 4}
        ]
    };

    return o;
}]);

