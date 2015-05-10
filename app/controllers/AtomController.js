var Article = require('../models/article');
var Feed = require('feed');

module.exports.controller = function(apiRouter) 
{
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
        if (err)
        {
            return res.send(err);
        }

        for (var key in articles)
        {
            var timeStamp = articles[key]._id.toString();
            var date = date = new Date( parseInt( timeStamp, 16 ) * 1000 );

            feed.addItem(
            {
                title: articles[key].title,
                link: 'http://donhey.io/article/' + articles[key]._id,
                date: date 
            });

            var output = feed.render('atom-1.0');
            res.send(output);
        }
    });

});
};