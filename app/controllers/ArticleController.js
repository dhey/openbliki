var Article = require('../models/article');

module.exports.controller = function(apiRouter) 
{
    "use strict";
    apiRouter.get('/article', function(req, res)
    {
        console.log("Retrieving the latest article...");

        Article.find({}).sort({_id: 'desc'}).limit(1).exec(function(err, article)
        {
            if (err)
            {
                return res.send(err);
            }

            // console.log(article);

            // Return the articles:
            res.json(article);
        });
    });
};