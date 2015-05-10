var Article = require('../../models/article');

module.exports.controller = function(apiRouter) 
{
    apiRouter.post('/article', function(req, res)
    {
        console.log('A request to create a new article was received.');
        console.log(req.body);
        var article = new Article();
        article.markdown = req.body.markdown;
        article.title = req.body.markdown[0];

        article.save(function(err) 
        {
            if (err) 
            {
                return res.json(
                {
                    success: false, 
                    message: 'Article saving borked.'
                });
            }

            console.log('The new ID is ' + article._id + '.');

            res.json(
            {
                success: true,
                message: 'Article created.',
                id: article._id
            });
        });
    });
};