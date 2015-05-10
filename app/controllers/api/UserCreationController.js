var User = require('../../models/user');

module.exports.controller = function(apiRouter) 
{
    // Create a user (accessed at POST http://localhost:8080/users)
    apiRouter.post('/users', function(req, res) 
    {
        // Create a new instance of the User model:
        var user = new User();      
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        console.log("Creating a new user:");
        console.log("Name: " + user.name);
        console.log("Username: " + user.username);
        console.log("Password: " + user.password);

        user.save(function(err) 
        {
            if (err) 
            {
                // Check for the duplicate entry error code:
                if (err.code === 11000)
                {
                    return res.json(
                    {
                        success: false, 
                        message: 'A user with that username already exists.'
                    });
                } 

                return res.send(err);
            }

            // Return a message
            res.json({ message: 'User created!', id : user.id });
        });
    });
};