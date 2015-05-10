var User = require('../../models/user');

module.exports.controller = function(apiRouter) 
{
    // Get the user with the provided id:
    apiRouter.delete('/users:user_id', function(req, res) 
    {
        User.remove(
        {
            _id: req.params.user_id
        }, function(err, user) 
        {
            if (err)
            {
                console.log('Could not delelte user: ' + err);
                return res.send(err);
            }

            res.json({ message: 'Successfully deleted.' });
        });
    });
};