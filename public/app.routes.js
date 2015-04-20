/*global angular */
angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
    "use strict";

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'views/pages/home.html'
		})
		
		// login page
		.when('/login', {
			templateUrl : 'views/pages/login.html',
			controller  : 'mainController',
			controllerAs: 'login'
		})
		
		.when('/compose', {
			templateUrl: 'views/pages/compose.html',
			controller: 'PostsCtrl',
			controllerAs: 'compose'
		})

		// show all users
		.when('/users', {
			templateUrl: 'views/pages/users/all.html',
			controller: 'userController',
			controllerAs: 'user'
		})

		// form to create a new user
		// same view as edit page
		.when('/users/create', {
			templateUrl: 'views/pages/users/single.html',
			controller: 'userCreateController',
			controllerAs: 'user'
		})

		// page to edit a user
		.when('/users/:user_id', {
			templateUrl: 'views/pages/users/single.html',
			controller: 'userEditController',
			controllerAs: 'user'
		});

		$locationProvider.html5Mode(true);

	});
