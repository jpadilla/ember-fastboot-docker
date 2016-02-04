/* eslint-disable strict, prefer-reflect */
'use strict';
const express = require('express');
const cluster = require('express-cluster');
const FastBootServer = require('ember-fastboot-server');
const basicAuth = require('basic-auth');

const DEFAULT_PORT = 3000;
const HTTP_401_UNAUTHORIZED = 401;

const USERNAME = process.env.FASTBOOT_USERNAME;
const PASSWORD = process.env.FASTBOOT_PASSWORD;
const PORT = process.env.PORT || DEFAULT_PORT;

const OUTPUT_PATH = '/src/fastboot-dist';

const CLUSTER_CONFIG = {
  verbose: true,
  respawn: false
};

function httpBasicAuth(username, password) {
  return function(req, res, next) {
    const user = basicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(HTTP_401_UNAUTHORIZED);
    }

    next();
  };
}

function log() {
  const args = Array.prototype.slice.apply(arguments);

  if (args[0] !== null || typeof args[0] !== 'undefined') {
    args[0] = '[' + (new Date()).toISOString() + '] ' + args[0];
  }

  console.log(...args);
}

cluster(function() {
  let listener;
  const app = express();

  const server = new FastBootServer({
    distPath: OUTPUT_PATH,
    ui: {
      writeLine: function() {
        log(...arguments);
      }
    }
  });

  if (USERNAME && PASSWORD) {
    app.use(httpBasicAuth(USERNAME, PASSWORD));
  }

  app.get('/*', server.middleware());

  listener = app.listen(PORT, function() {
    const host = listener.address().address;
    const port = listener.address().port;

    log('FastBoot server listening at http://%s:%s', host, port);
  });
}, CLUSTER_CONFIG);
