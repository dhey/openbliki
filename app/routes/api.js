var express = require('express');
module.exports = express();
var apiRouter = module.exports;
var fs = require('fs');
var jwt = require('jsonwebtoken');
var path = require('path');
var superSecret = 'bourbon';

// Dynamically include the controllers for public routes
fs.readdirSync('./app/controllers').forEach(function (file) 
{
    "use strict";

	if(file.substr(-3) === '.js') 
	{
		var route = require('../controllers/' + file);
		route.controller(apiRouter);
	}
});

// Middleware to use for all requests:
apiRouter.use(function(req, res, next) 
{
    "use strict";
	console.log('Middleware is trying to authenticate...');

	var token = req.body.token || req.params.token 
	|| req.headers['x-access-token'];

	if (token)
	{
		// console.log('The token was: ' + token);

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

// Dynamically include the controllers for authenticated routes:
fs.readdirSync('./app/controllers/api').forEach(function (file) 
{
    "use strict";

	if(file.substr(-3) === '.js') 
	{
		console.log('Loading ' + file);
		var route = require('../controllers/api/' + file);
		route.controller(apiRouter);
	}
});
