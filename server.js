'use strict';

var Hapi = require('hapi');

var path = require('path');
var settings = require('./config/config.json');

var routes = require('./routes');
var plugins = require('./plugins');
var models = require('./models');

const internals = {
  templatePath: '.'
};

const server = new Hapi.Server({
  host: settings.host || '0.0.0.0',
  port: settings.port || '4201'
});

// server.connection({port:settings.port, host:settings.host});

// Export the server to be required elsewhere.

var initDb = function (cb) {
  var sequelize = models.sequelize;
  if (sequelize.getDialect() === 'sqlite') {
    cb();
  } else {
    cb();
  }
};

server.route(routes);


internals.main = async () => {
  await server.start();
  initDb(() => {
    console.log('Server is running at ' + server.info.uri);
  });

}

internals.main();

module.exports = server;
