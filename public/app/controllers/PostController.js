/*global angular, alert, Article */
angular.module('PostController', ['ArticleService'])
.controller('PostController', 

    function(ArticleService, $scope, $stateParams, posts, $location, $http)
    {
        "use strict";

        var vm = this;

        // set a processing variable to show loading things
        vm.processing = true;

        // grab all the articles at page load
        ArticleService.all().success(function(data) 
        {
            // when all the articles come back, remove the processing variable
            vm.processing = false;

            // bind the articles that come back to vm.articles
            vm.articles = data;
        });

        // $scope.post = posts.posts[$stateParams.id];
        $scope.posts = posts.posts;

        $scope.addComment = function()
        {
            alert('We\'re in addComment().');

            if($scope.body === '') 
            {
                alert('No comment body.');
                return; 
            }

            $scope.post.comments.push(
            {
                body: $scope.body,
                author: 'user',
                upvotes: 0
            });
            
            $scope.body = '';
        };

        $scope.addPost = function()
        {
            if (!$scope.title || $scope.title === '')
            {
                return;
            }

            $scope.posts.push(
            {
                title: $scope.title,
                link: $scope.link,
                upvotes: 0,
                comments: [
                { author: 'Joe', body: 'Cool post!', upvotes: 0 },
                { author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0 }
                ]
            });

            $scope.title = '';
            $scope.link = '';
        };

        $scope.incrementUpvotes = function(post)
        {
            post.upvotes += 1;
        };

        $scope.createArticle = function()
        {
            var article = new Article(),
            payload;
            article.markdown = $scope.editedArticle.split('\n');
            payload = angular.toJson(article, 2);
            
            $http.post('/api/article', payload)
            .success(function(data, status, headers, config)
            {
                if (!data.error)
                {
                    console.log(data);
                    console.log('Article created successfully!');
                    $location.path('/article/' + data.id);
                }

                else
                {
                   console.log('Something happened!');
               }
           })

            .error(function(data, status, headers, config)
            {
                /*handle non 200 statuses*/
                console.log('An error was handled.');
            });
        };
    });
