var User = require('../../models/user');

module.exports.controller = function(apiRouter) 
{
    // Create a user (accessed at POST http://localhost:8080/users)
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