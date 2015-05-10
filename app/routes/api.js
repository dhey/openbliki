var User = require('../models/user');
var Article = require('../models/article');
var express = require('express');
var apiRouter = module.exports = express();
var fs = require('fs');
var path = require('path');
var jwt = require('jsonwebtoken');
var superSecret = 'bourbon';


// dynamically include routes (Controller)
fs.readdirSync('./app/controllers').forEach(function (file) {
	if(file.substr(-3) == '.js') {
		route = require('../controllers/' + file);
		route.controller(apiRouter);
	}
});

// Middleware to use for all requests:
apiRouter.use(function(req, res, next) 
{
	console.log('Middleware is trying to authenticate...');

	var token = req.body.token || req.param('token') 
	|| req.headers['x-access-token'];

	if (token)
	{
		console.log('The token was: ' + token);

		jwt.verify(token, superSecret, function(err, decoded) 
		{
			if(err) 
			{
				return res.status(403).send(
				{
					success: false,
					message: 'Failed to authenticate token.'
				});
			}

			req.decoded = decoded;
			next();
		});
	}

	else
	{
		console.log('No token was found. Authentication failed.');
		return res.status(403).send(
		{
			success: false,
			message: 'No token was provided.'
		});
	}
});

// On routes that end in /users
apiRouter.route('/users')

		// Get all the users (accessed at GET http://localhost:8080/api/users)
		.get(function(req, res) 
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

	// Routes that end in /users/:user_id
	apiRouter.route('/users/:user_id')

		// Get the user with the provided id:
		.get(function(req, res) 
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
		})

		// Update the user with the provided id:
		.put(function(req, res) 
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
					user.save(function(err) {
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
		})

		// Delete the user with the provided id:
		.delete(function(req, res) 
		{
			User.remove(
			{
				_id: req.params.user_id
			}, function(err, user) 
			{
				if (err)
				{
					return res.send(err);
				}

				res.json({ message: 'Successfully deleted.' });
			});
		});
