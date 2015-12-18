/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var autopolicy = require('./src/domain/AutoPolicy');
var policymaster = require('./src/domain/PolicyMaster');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

var router = express.Router();  
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.get('/v1/policy/:id', function(req, res){
	id = req.params.id;

	autopolicy.policy(parseInt(id),function(dat){
		res.send(dat);
		console.log('Ok');
	});	
});

router.get('/v1/policy', function(req, res){

	autopolicy.allPolicies(function(dat){
		res.send(dat);
		console.log('Ok');
	});	
});


router.get('/v1/customer', function(req, res){
	policymaster.allCustomer(function(dat){
		res.send(dat);
		console.log('Ok');
	});	
});

router.get('/v1/customer/:id', function(req, res){
	id = req.params.id;
	policymaster.customer(parseInt(id), function(dat){
		res.send(dat);
		console.log('Ok');
	});	
});

app.use('/api', router);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


var url = 'mongodb://localhost:27017/test';  // for local use this & comment next line
url = "PROVIDE MONGOLAB URL HERE";



MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

// autopolicy.allPolicies(function(dat){
	// console.log(dat);
// });
