angular.module('UserService', [])
.factory('UserService', function($http) {

	// Create the object:
	var userFactory = {};

	// Get a single user:
	userFactory.get = function(id) {
		var data = $http.get('/api/users/' + id);
		console.log('The user service retrieved: ' + data.user_id);
		return data;
	};

	// Get all users:
	userFactory.all = function() {
		return $http.get('/api/users/');
	};

	// Create a user:
	userFactory.create = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// Update a user:
	userFactory.update = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	// Delete a user:
	userFactory.delete = function(id) {
		return $http.delete('/api/users/' + id);
	};

	return userFactory;
});

