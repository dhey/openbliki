var Article = require('../models/article');
var Feed = require('feed');

module.exports.controller = function(apiRouter) 
{
    "use strict";
    apiRouter.get('/rss', function(req, res)
    {
        console.log('A request for the RSS feed was received...');
        var feed = new Feed(
        {
            title: 'donhey.io',
            description: 'Personal blog',
            link: 'http://donhey.io',
            image: '',
            copyright: 'Don Hey, 2015-',
            author:
            {
                name: 'Don Hey',
                email: 'donhey@gmail.com',
                link: 'http://donhey.io'
            }
        });

        Article.find({}).sort({_id: 'desc'}).exec(function(err, articles)
        {
            var key, output;

            if (err)
            {
                return res.send(err);
            }

            for (key in articles)
            {
                if (articles.hasOwnProperty(key))
                {
                    feed.addItem(
                    {
                        title: articles[key].title
                    });
                }
            }

            output = feed.render('rss-2.0');
            res.send(output);
        });
    });
};