'use strict';
/**************************************************************************************************
 * This sample demonstrates the most simplistic usage of Swagger-Express-Middleware.
 * It simply creates a new Express Application and adds all of the Swagger middleware
 * without changing any options, and without adding any custom middleware.
 **************************************************************************************************/

// Set the DEBUG environment variable to enable debug output
process.env.DEBUG = 'swagger:middleware';

var express = require('express');
var middleware = require('poc-swagger-middleware');
var path = require('path');
var app = express();
var swaggerFile = path.join(__dirname, 'swagger.yaml');

var launchEditor = true; 

middleware(swaggerFile, app, function(err, middleware) {
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest(),
  //  middleware.editor(),
    middleware.mock()
  );
  
  app.get('/', function(req, res){
    console.log('redirect to index');
    res.sendFile(__dirname + '/index.html');
  });  
  
  app.listen(9000, function() {
    console.log('The PoC is now running at http://localhost:9000');
  });

  var open = require('open');
  open('http://localhost:9000/');
});





