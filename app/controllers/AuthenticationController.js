var Article = require('../models/article');

module.exports.controller = function(apiRouter) 
{
    apiRouter.post('/authenticate', function(req, res) 
    {
        console.log("Trying to authenticate...");
        console.log("username: " + req.body.username);
        console.log("password: " + req.body.password);

        User.findOne({
            username: req.body.username
        }).select('name username password').exec(function(err, user) {

            if (err || !user) {
                res.json({
                    success: 'false',
                    message: 'Authentication failed: User not found.'
                });
            }

            else
            {
                var validPassword = user.comparePassword(req.body.password),
                token = jwt.sign(
                {
                    name: user.name,
                    username: user.username 
                },
                superSecret,
                {
                    expiresInMinutes: 1440
                });

                if (!validPassword) 
                {
                    res.json({
                        success: false,
                        message: 'Authentication failed. Wrong password.'
                    });
                }

                else
                {
                    res.json({
                        success: true,
                        message: 'Enjoy your token.',
                        token: token
                    });
                }
            }
        });
    });
};