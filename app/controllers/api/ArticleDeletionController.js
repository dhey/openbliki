var Article = require('../../models/article');

module.exports.controller = function(apiRouter) 
{
    "use strict";
    apiRouter.route('/article/:article_id').delete(function(req, res)
    {
        var articleID = req.params.article_id;
        console.log('Deleting article with ID ' + articleID + '...');

        Article.remove(
        {
            _id: articleID
        },

        function(err, user) 
        {
            if (err)
            {
                return res.send(err);
            }

            res.json({ message: 'Successfully deleted.' });
        });
    });
};