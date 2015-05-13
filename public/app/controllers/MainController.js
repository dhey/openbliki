/*global angular, $location, markdown  */
angular.module('MainController', ['ArticleService', 'ngSanitize'])
.controller('MainController', function(ArticleService, $sce, $rootScope, $location, AuthService) {
    "use strict";

	var vm = this;

	// get info if a person is logged in
	vm.loggedIn = AuthService.isLoggedIn();
	vm.htmlContent = "Loading...";

	ArticleService.all().success(function(data)
	{
		var	markdown_content = '', outerLoop, articleArray, innerLoop;

		for (outerLoop = 0; outerLoop < data.length; outerLoop+=1)
		{
			articleArray = data[outerLoop].markdown;

			for (innerLoop = 0; innerLoop < articleArray.length; innerLoop+=1)
			{
				markdown_content = markdown_content + articleArray[innerLoop] + '\n';
			}

			markdown_content = markdown_content + '\n-----\n';
		}

		vm.htmlContent = markdown.toHTML(markdown_content);
		vm.articles = $sce.trustAsHtml('<div>' + vm.htmlContent + '</div>');
	});

	// check to see if a user is logged in on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = AuthService.isLoggedIn();	

		// get user information on page load
		AuthService.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	// function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		console.log('Trying to log in to the server...');

		// clear the error
		vm.error = '';

		AuthService.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success)
				{
					$location.path('/');
					console.log('User logged in!');
				}			
				else
				{
					vm.error = data.message;
				} 				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		AuthService.logout();
		vm.user = '';
		$location.path('/login');
	};

})

 .filter('markdown', function() {
    "use strict";
      return function(text) 
      {
          if (text === "undefined") 
          {
              return "";
          }
          
          return markdown.toHTML(String(text));
      };
  });
