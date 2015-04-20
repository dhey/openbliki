/**
 * server.js
 */

// Set up packages:
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var User       = require('./app/models/user');
var port       = process.env.PORT || 8080;
var path = require('path');

// Use body parser so we can grab information from POST requests:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure the app to handle CORS requests:
app.use(function(req, res, next) {
    "use strict";

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// Log all requests to the console
app.use(morgan('dev'));

// Connect to the database:
mongoose.connect('mongodb://localhost:27017/openBliki'); 

// Set static files location used for requests that our front end will make:
app.use(express.static(__dirname + '/public'));

// Get an instance of the express router:
var apiRouter = express.Router();

// API routes: This pulls in routes from app/routes/api.js:
var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// Main Catchall Route
// -------------------
// Send users to the front end.
app.get('*', function (req, res)
{
    "use strict";
    res.header("Content-Type",  "text/html; charset=UTF-8");
    res.header("Content-Encoding", "compress");
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// Start the server:
app.listen(port);
console.log('Listening on port ' + port);
