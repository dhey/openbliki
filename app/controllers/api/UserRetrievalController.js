var User = require('../../models/user');

module.exports.controller = function(apiRouter) 
{
    "use strict";

    // Get the user with the provided id:
    apiRouter.route('/users:user_id').get(function(req, res) 
    {
        console.log('UserRetrievalController was invoked.');

        User.findById(req.params.user_id, function(err, user) 
        {
            if (err)
            {
                return res.send(err);   
            } 

            console.log('Sending user: ' + user);

            // Return the user:
            res.json(user);
        });
    });
};