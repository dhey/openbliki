/*global angular, $location, markdown  */
angular.module('mainCtrl', ['articleService', 'ngSanitize'])

.controller('mainController', function(ArticleFactory, $sce, $rootScope, $location, Auth) {
    "use strict";

	var vm = this;

	// get info if a person is logged in
	vm.loggedIn = Auth.isLoggedIn();
	vm.htmlContent = "Loading...";

	ArticleFactory.all().success(function(data)
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
		vm.loggedIn = Auth.isLoggedIn();	

		// get user information on page load
		Auth.getUser()
			.then(function(data) {
				vm.user = data.data;
			});	
	});	

	// function to handle login form
	vm.doLogin = function() {
		vm.processing = true;

		// clear the error
		vm.error = '';

		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;			

				// if a user successfully logs in, redirect to users page
				if (data.success)
				{
					$location.path('/');
				}			
				else
				{
					vm.error = data.message;
				} 				
			});
	};

	// function to handle logging out
	vm.doLogout = function() {
		Auth.logout();
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
