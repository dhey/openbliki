var User = require('../models/user');
var Article = require('../models/article');
var jwt = require('jsonwebtoken');
var superSecret = 'bourbon';

module.exports = function(app, express)
{
	"use strict";

	// Get an instance of the Express router:
	var apiRouter = express.Router();

	apiRouter.post('/article', function(req, res)
	{
		console.log('A request to create a new article was received.');
		console.log(req.body);
		var article = new Article();
		article.markdown = req.body.markdown;
		article.title = req.body.markdown[0];

		article.save(function(err) 
		{
			if (err) 
			{
				return res.json(
				{
					success: false, 
					message: 'Article saving borked.'
				});
			}

			res.json(
			{
				success: true,
				message: 'Article created.'
			});
		});
	});

	apiRouter.get('/article', function(req, res)
	{
		console.log("Retrieving all articles...");

		Article.find({}).sort({_id: 'desc'}).limit(1).exec(function(err, articles)
		{
			if (err)
			{
				return res.send(err);
			}

			console.log(articles);

			// Return the articles:
			res.json(articles);
		});
	});

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

		// Create a user (accessed at POST http://localhost:8080/users)
		.post(function(req, res) 
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

		})

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

		return apiRouter;
	};
