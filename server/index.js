/* eslint consistent-return:0 */

const express = require('express');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const {
  choosePort,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const paths = require('../config/paths');
const logger = require('./util//logger');

const argv = require('./util/argv');
const DEFAULT_PORT = require('./util/port');
const setup = require('./middlewares/frontendMiddleware');

const app = express();

const isInteractive = process.stdout.isTTY;

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: paths.appBuild,
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    // We attempt to use the default port but if it is busy, we offer the user to
    // run on a different port. `choosePort()` Promise resolves to the next free port.
    return choosePort(host, DEFAULT_PORT);
  })
  .then(port => {
    if (port == null) {
      // We have not found a port.
      return;
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls(protocol, prettyHost, port);
    // Start your app.
    app.listen(port, host, err => {
      app.keepAliveTimeout = 0;
      if (err) {
        return logger.error(err.message);
      }
      logger.appStarted(port, prettyHost);
      openBrowser(urls.localUrlForBrowser);
    });
  });
