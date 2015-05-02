/*global angular */
angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    "use strict";

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'app/views/templates/home.html'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'app/views/templates/login.html',
			controller  : 'mainController',
			controllerAs: 'login'
		})
		
		.when('/compose', {
			templateUrl: 'app/views/templates/compose.html',
			controller: 'PostsCtrl',
			controllerAs: 'compose'
		})

		.when('/titles', {
			templateUrl: 'app/views/templates/titles.html',
			controller: 'TitlesController',
			controllerAs: 'titlesController'
		})

		.when('/article/:article_id', {
			templateUrl: 'app/views/templates/article.html',
			controller: 'ArticleController',
			controllerAs: 'articleController'
		})

		// show all users
		.when('/users', {
			templateUrl: 'app/views/templates/users/all.html',
            controller: 'userController',
            controllerAs: 'user'
		})

		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'app/views/templates/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'app/views/templates/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		});

		$locationProvider.html5Mode(true);

	});
