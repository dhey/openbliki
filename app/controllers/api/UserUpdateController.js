var User = require('../../models/user');

module.exports.controller = function(apiRouter) 
{
    // Update the user with the provided id:
    apiRouter.put('/users', function(req, res) 
    {
        User.findById(req.params.user_id, function(err, user) 
        {
            if (err)
            {
                res.send(err);
            }

            else if (user)
            {
                // Set the new user information if it exists in the request:
                if (req.body.name)
                {
                    user.name = req.body.name;  
                } 
                if (req.body.username) 
                {
                    user.username = req.body.username;
                }
                if (req.body.password)
                {
                    user.password = req.body.password;
                }

                // Save the user:
                user.save(function(err) 
                {
                    if (err)
                    {
                        if (err)
                        {
                            res.send(err);
                        }
                    }

                    // Return a message:
                    res.json({ message: 'User updated!' });
                });
            }

            else
            {
                res.status(422);
                res.json({ message: 'The user was not found.' });
            }
        });
    });
};