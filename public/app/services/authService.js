angular.module('authService', [])

// Auth factory to log in and get information.
// Inject $http for communicating with the API.
// Inject $q to return promise objects.
// Inject AuthToken to manage tokens.
.factory('Auth', function($http, $q, AuthToken) {

	// Create an auth factory object:
	var authFactory = {};

	// Handle login:
	authFactory.login = function(username, password) {

		// Return the promise object and its data:
		return $http.post('/api/authenticate', {
			username: username,
			password: password
		})
		.success(function(data) {
			AuthToken.setToken(data.token);
			return data;
		});
	};

	// Handle logout:
	authFactory.logout = function() {

		// Clear the token:
		AuthToken.setToken();
	};

	// Check if a user is logged in. Checks if there is a local token.
	authFactory.isLoggedIn = function() {
		if (AuthToken.getToken())
			return true;
		else
			return false;
	};

	// Get the logged in user:
	authFactory.getUser = function() {
		if (AuthToken.getToken())
			return $http.get('/api/me', { cache: true });
		else
			return $q.reject({ message: 'User has no token.' });
	};

	// Return the auth factory object:
	return authFactory;
})

// Factory for handling tokens.
// Inject $window to store the token on the client side.
.factory('AuthToken', function($window) {

	var authTokenFactory = {};

	// Get the token out of local storage:
	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};

	// Set the token or clear the token. If a token is passed set the
	// token. If there is no token clear it from local storage.
	authTokenFactory.setToken = function(token) {
		if (token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	};

	return authTokenFactory;
})

// Application configuration to integrate token into requests:
.factory('AuthInterceptor', function($q, $location, AuthToken) {

	var interceptorFactory = {};

	// This will happen all HTTP requests:
	interceptorFactory.request = function(config) {

		// Grab the token:
		var token = AuthToken.getToken();

		// If the token exists, add it to the header as x-access-token:
		if (token)
			config.headers['x-access-token'] = token;

		return config;
	};

	// Happens on response errors:
	interceptorFactory.responseError = function(response) {

		// If our server returns a 403 forbidden respones:
		if (response.status == 403) {
			AuthToken.setToken();
			$location.path('/login');
		}

		// Return the errors from the server as a promise:
		return $q.reject(response);
	};

	return interceptorFactory;
});

