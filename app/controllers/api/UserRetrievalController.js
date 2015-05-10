var User = require('../../models/user');

module.exports.controller = function(apiRouter) 
{
    // Get the user with the provided id:
    apiRouter.get('/users:user_id', function(req, res) 
    {
        User.findById(req.params.user_id, function(err, user) 
        {
            if (err)
            {
                return res.send(err);   
            } 

            // Return the user:
            res.json(user);
        });
    });
};