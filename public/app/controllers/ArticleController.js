/*global angular, $location, markdown  */
angular.module('ArticleController', ['ArticleService', 'ngSanitize'])
.controller('ArticleController',

    function(ArticleService, $scope, $stateParams, $routeParams, $sce, $rootScope, $location)
    {
        "use strict";
        var vm = this;
        vm.processing = true;


        ArticleService.get($routeParams.article_id).success(function(data)
        {
            var markdown_content = '', loop, articleArray;
            articleArray = data[0].markdown;

            for (loop = 0; loop < articleArray.length; loop+=1)
            {
                markdown_content = markdown_content + articleArray[loop] + '\n';
            }

            console.log('Markdown == ' + markdown_content);
            vm.htmlContent = markdown.toHTML(markdown_content);
            vm.article = $sce.trustAsHtml('<div>' + vm.htmlContent + '</div>');
            vm.processing = false;
        });
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
