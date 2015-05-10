var Article = require('../models/article');
var Feed = require('feed');

module.exports.controller = function(apiRouter) 
{
    "use strict";
    apiRouter.get('/atom', function(req, res)
    {
        console.log('A request for the Atom feed was received...');
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
            var key, timeStamp, date, output;

            if (err)
            {
                return res.send(err);
            }

            for (key in articles)
            {
                if (articles.hasOwnProperty(key)) 
                {
                    timeStamp = articles[key]._id.toString();
                    date = new Date( parseInt( timeStamp, 16 ) * 1000 );

                    feed.addItem(
                    {
                        title: articles[key].title,
                        link: 'http://donhey.io/article/' + articles[key]._id,
                        date: date 
                    });
                }
            }

            output = feed.render('atom-1.0');
            res.send(output);
        });
    });
};