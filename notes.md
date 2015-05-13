README
======

Feature List
------------

- Multiple authors can collaborate on an article.
- Authenticated users can comment on an article.
- Save article revision diffs.

Angular Client Routes
---------------------

    Route           Template URL                  Controller
    -------------------------------------------------------------------
    /               views/pages/home.html
    /compose        views/pages/compose.html      mainController  
    /login          views/pages/login.html        PostCtrl
    /users          views/pages/users/all.html    userController
    /users/create   views/pages/users/single.html userCreateController
    /users/:user_id views/pages/users/single.html userEditController

REST API Routes
---------------

    Route                       Verb    Behaviour
    --------------------------------------------------------------------
    /api/article                GET     Get all articles.
    /api/article                POST    Create an article.
    /api/article/:article_id    GET     Retrieve an article.
    /api/article/:article_id    PUT     Update an article.
    /api/article/:article_id    DELETE  Delete an article.
    /api/atom                   GET     Get the atom feed.
    /api/authentication         POST    Request an authentication token.
    /api/rss                    GET     Get the RSS feed.
    /api/users                  GET     Get all users.
    /api/users/:user_id         POST    Create a user.
    /api/users/:user_id         GET     Retrieve a user.
    /api/users/:user_id         PUT     Update a user.
    /api/users/:user_id         DELETE  Delete a user.

JSON
----

    Article
    {
        "id": "1",
        "title": "My First Post",
        "authors":
        [
            "Don Hey",
            "Hunter S. Thompson"
        ],
        "posted": "2015-04-15 21:30",
        "updated": "2015-04-16 09:21",
        "markdown":
        [
            "Welcome to my very first blog post!",
            "",
            "I\'m **so** excited to be a blogger!"
        ],
        "comments":
        {
            "id": "1",
            "user": "h8t3r",
            "date": "2015-04-15 21:33"
            "markdown":
            [   
                "Dude, you **SUCK**!!!",
                "",
                "LAMEST thing I ever READ!"
            ]
        }
    }

Questions
---------

*Is there a Gulp plug-in for Casper tests?*

> Yes! https://www.npmjs.com/package/gulp-casperjs/

*Is there a Gulp plug-in for Mocha?*

> Yes! https://www.npmjs.com/package/gulp-mocha/

*Is there a Gulp plug-in for Frisby tests? If not can we use a Mocha plug-in?*

> There is no frisbyjs Gulp plug-in but we should be able to use the Jasmine plug-in. https://www.npmjs.com/package/gulp-jasmine/

*Can we use JSONLint to test the REST API?*

> Possibly. https://www.npmjs.com/package/gulp-json-lint/

Resources
---------

https://gun.io/blog/multi-line-strings-in-json/
