// Tell JSLint that these Mocha variables should be treated as global. Mocha 
// hates it if we require them.
/*global describe */
/*global it */

var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Routing', function()
{
	"use strict";

	// A test suite for testing the authentication API:
	describe('REST API tests.', function()
	{
		var token = ":-P";
		
		// Test the authentication API with a valid login credentials:
		it('Test the home route.', function(done)
		{
			request('http://localhost:8080').get('/').end(function(err, res)
			{
				if (err)
				{
					throw err;
				}

				res.statusCode.should.equal(200);
				done();
			});
		});

		// Test the authentication API with a valid login credentials:
		it('Test the authentication API with valid credentials.', function(done)
		{
			var login =
			{
				username : 'admin',
				password: 'admin'
			};

			request('http://localhost:8080').post('/api/authenticate').send(
				login).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					res.body.message.should.equal('Enjoy your token.');
					token = res.body.token;
					done();
				});
			});

		// Test the authentication API with a bogus user name:
		it('Test the authentication API with a bogus username.', function(done)
		{
			var login =
			{
				username : 'bob'
			};

			request('http://localhost:8080').post('/api/authenticate').send(
				login).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}
					res.body.message.should.equal('Authentication failed: User not found.');
					done();
				});
			});
		
		// Test the authentication API with a bogus password:
		it('Test the authentication API with a bogus password.', function(done)
		{
			var login =
			{
				username : 'admin',
				password: 'bogus'
			};

			request('http://localhost:8080').post('/api/authenticate').send(
				login).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}
					res.body.message.should.equal('Authentication failed. Wrong password.');
					done();
				});
			});
		
		it('Test the retrieval of all users.', function(done)
		{
			var payload =
			{
				token : token
			};

			request('http://localhost:8080').get('/api/users').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}
					res.statusCode.should.equal(200);
					done();
				});
			});
		
		it('Test an unathenticated attempt to retrieve all users.', function(done)
		{
			var payload =
			{
				message : "No token."
			};

			request('http://localhost:8080').get('/api/users').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}
					res.statusCode.should.equal(403);
					done();
				});
			});
		
		it('Test the user creation and user deletion APIs.', function(done)
		{
			var userId,
			payload =
			{
				name : "Betty Rubble",
				username : "brubble99",
				password : "Charge-it!",
				token : token
			};

			request('http://localhost:8080').post('/api/users').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					res.body.message.should.equal('User created!');
					res.statusCode.should.equal(200);
					userId = res.body.id;

					console.log('User created.');
				});

				request('http://localhost:8080').delete('/api/users/' + userId).send(
					payload).end(function(err, res)
					{
						if (err)
						{
							throw err;
						}

						res.statusCode.should.equal(200);
						userId = res.body.id;
						done();
					});
				});

		it('Test an unathenticated attempt to create a user.', function(done)
		{
			var payload =
			{
				name : "Betty Rubble",
				username : "brubble8",
				password : "Charge-it!"
			};

			request('http://localhost:8080').post('/api/users').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					res.body.message.should.equal('No token was provided.');
					res.statusCode.should.equal(403);
					done();
				});
			});

		it('Test an attempt to delete a non-existent user.', function(done)
		{
			var payload =
			{
				token : token
			};

			request('http://localhost:8080').delete('/api/users/550ec7fba2bdc1ea5afb149x').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					// The server handles the deletion of a non-existent user 
					// as a no-op:
					res.body.message.should.equal('Successfully deleted.');
					res.statusCode.should.equal(200);
					done();
				});
			});

		it('Test the attempted creation of a duplicate user.', function(done)
		{
			var payload =
			{
				name : "Fred Flintstone",
				username : "fflintstone",
				password : "Yabba-dabba-doo2",
				token : token
			};

			request('http://localhost:8080').post('/api/users').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					res.body.message.should.equal('A user with that username already exists.');
					res.statusCode.should.equal(200);
					done();
				});
			});

		it('Test user updates.', function(done)
		{
			var payload =
			{
				name : "Fred Flintstone",
				username : "fflintstone",
				password : "Yabba-dabba-doo2",
				token : token
			};

			request('http://localhost:8080').put('/api/users/550ec7fba2bdc1ea5afb149e').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					res.body.message.should.equal('User updated!');
					res.statusCode.should.equal(200);
					done();
				});
			});

		it('Test an unathenticated attempt to update a user.', function(done)
		{
			var payload =
			{
				name : "Fred Flintstone",
				username : "fflintstone",
				password : "Yabba-dabba-doo2"
			};

			request('http://localhost:8080').put('/api/users/550ec7fba2bdc1ea5afb149e').send(
				payload).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					res.body.message.should.equal('No token was provided.');
					res.statusCode.should.equal(403);
					done();
				});
			});

		it('Test the attempted update of a non-existant user.', function(done)
		{
			var payload =
			{
				name : "Fred Flintstone",
				username : "fflintstone",
				password : "Yabba-dabba-doo2",
				token : token
			};

			request('http://localhost:8080').put('/api/users/550ec7fba2bdc1ea5afb149x').send(
				payload ).end(function(err, res)
				{
					if (err)
					{
						throw err;
					}

					res.body.message.should.equal('The user was not found.');
					res.statusCode.should.equal(422);
					done();
				});
			});
	});
});
