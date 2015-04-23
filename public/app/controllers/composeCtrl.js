 angular.module('composeCtrl', ['userService'])

 .controller('composeController', ['$scope', '$http', function($scope, $http) 
 {
    "use strict";

 	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	this.inputText = '';

	vm.composeController = function() 
	{
		$location.path('/compose');
	};
}]);