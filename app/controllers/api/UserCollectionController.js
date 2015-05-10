var User = require('../../models/user');

module.exports.controller = function(apiRouter) 
{
    "use strict";
    apiRouter.get('/users', function(req, res) 
    {
        console.log("Retrieving all users...");

        User.find(function(err, users) 
        {
            if (err)
            {
                return res.send(err);
            }

            // Return the users:
            res.json(users);
        });
    });
};