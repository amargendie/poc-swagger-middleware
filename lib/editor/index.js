'use strict';

module.exports = editor;

var _    = require('lodash'),
    config = require('../../config'),
    emit = require('../util/feedback').emit,
    browser = require('../util/browser'),
    util = require('util'),
    path = require('path'),
    serveStatic = require('serve-static'),
    fs = require('fs');



const SWAGGER_EDITOR_SERVE_PATH = '/', // swagger-editor must be served from root
      SWAGGER_EDITOR_LOAD_PATH = '/editor/spec',// swagger-editor expects to GET the file here
      SWAGGER_EDITOR_SAVE_PATH = '/editor/spec',// swagger-editor PUTs the file back here
      SWAGGER_EDITOR_CONFIG_PATH = '/config/defaults.json';// swagger-editor GETs the configuration files


/**
 * Validates the HTTP request against the Swagger API.
 * An error is sent downstream if the request is invalid for any reason.
 *
 * @param   {MiddlewareContext}    context
 * @returns {function[]}
 */

function editor(swaggerFile) {
}

function editor2(swaggerFile) {
     
  var options = {"port":"","host":"","silent":""};
  var cb;

  var app = require('connect')();

  // save the file from swagger-editor
  app.use(SWAGGER_EDITOR_SAVE_PATH, function(req, res, next) {
    if (req.method !== 'PUT') { return next(); }
    var stream = fs.createWriteStream(swaggerFile);
    req.pipe(stream);

    stream.on('finish', function() {
      res.end('ok');
    })
  });

  // retrieve the project swagger file for the swagger-editor
  app.use(SWAGGER_EDITOR_LOAD_PATH, serveStatic(swaggerFile) );

  app.use(SWAGGER_EDITOR_CONFIG_PATH, function(req, res, next) {
    if (req.method !== 'GET') { return next(); }
    res.end(JSON.stringify(config.swagger.editorConfig));
  });

  // serve swagger-editor
  app.use(SWAGGER_EDITOR_SERVE_PATH, serveStatic(config.swagger.editorDir));


  // start //

  var http = require('http');
  var server = http.createServer(app);
  var port = options.port || 0;
  var hostname = options.host || '127.0.0.1';
  server.listen(port, hostname, function() {
    port = server.address().port;
    var editorUrl = util.format('http://%s:%d/#/edit', hostname, port);
    var editApiUrl = util.format('http://%s:%d/editor/spec', hostname, port);
    var dontKillMessage = 'Do not terminate this process or close this window until finished editing.';
    emit('Starting Swagger Editor.');

    if (!options.silent) {
      browser.open(editorUrl, function(err) {
        if (err) { return cb(err); }
        emit(dontKillMessage);
      });
    } else {
      emit('Running Swagger Editor API server. You can make GET and PUT calls to %s', editApiUrl);
      emit(dontKillMessage)
    }
  });

}