var Article = require('../models/article');

module.exports.controller = function(apiRouter) 
{
 apiRouter.get('/titles', function(req, res)
 {
    console.log("Retrieving all titles...");

    Article.find({}, 'title').sort({_id: 'desc'}).exec(function(err, titles)
    {
        if (err)
        {
            return res.send(err);
        }

            // Return the articles:
            res.json(titles);
        });
    });
};