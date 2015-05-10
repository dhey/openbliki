var Article = require('../models/article');

module.exports.controller = function(apiRouter) 
{
    "use strict";
    apiRouter.route('/article/:article_id').get(function(req, res)
    {
        console.log('ArticleRetrievalController was invoked.');
        var articleID = req.params.article_id;

        Article.find(
        {
            _id: articleID
        },

        function(err, article) 
        {
            if (err)
            {
                return res.send(err);
            }

            res.json(article);
        });
    });
};