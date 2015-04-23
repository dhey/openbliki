/*global angular, $location, marked  */
 // var markedApp = angular.module('markedApp', ['ngSanitize']);

 // markedApp.directive("autoGrow", function(){
 //    "use strict";
 // 	return function(scope, element, attr){
 // 		var update = function(){
 // 			element.css("height", "auto");
 // 			element.css("height", element[0].scrollHeight + "px");
 // 		};
 // 		scope.$watch(attr.ngModel, function(){
 // 			update();
 // 		});
 // 		attr.$set("ngTrim", "false");
 // 	};
 // });


 angular.module('composeCtrl', ['userService'])

 .controller('composeController', ['$scope', '$http', function($scope, $http) {
    "use strict";

 	var vm = this;

	// set a processing variable to show loading things
	vm.processing = true;

	this.inputText = '';

	$scope.$watch('marked.inputText', function(current, original) {
		// vm.outputText = marked(current);
		vm.outputText = "WTF?!";
	});

	vm.composeController = function() {
		$location.path('/compose');
	};


// // basic config for marked library - this will provide us with GitHub flavored markdown
// marked.setOptions({
// 	renderer: new marked.Renderer(),
// 	gfm: true,
// 	tables: true,
// 	breaks: false,
// 	pedantic: false,
// 	sanitize: false,
// 	smartLists: true,
// 	smartypants: false
// });

}]);