"use strict";

exports.__esModule = true;
exports.compileLocalInstallmentsClientScript = compileLocalInstallmentsClientScript;
exports.getInstallmentsClientScript = getInstallmentsClientScript;

var _path = require("path");

var _sdkConstants = require("@paypal/sdk-constants");

var _config = require("./config");

var _lib = require("./lib");

var _watchers = require("./watchers");

async function compileLocalInstallmentsClientScript() {
  const root = (0, _path.join)(__dirname, '../');
  const {
    WEBPACK_CONFIG_INSTALLMENTS_DEBUG
  } = (0, _lib.babelRequire)((0, _path.join)(root, _config.WEBPACK_CONFIG));
  const script = await (0, _lib.compileWebpack)(WEBPACK_CONFIG_INSTALLMENTS_DEBUG, root);
  return {
    script,
    version: _sdkConstants.ENV.LOCAL
  };
}

async function getInstallmentsClientScript({
  logBuffer,
  cache,
  debug = false
} = {}) {
  const val = true; // eslint-disable-next-line no-console

  console.log('-------------getInstallmentsClientScript');

  if ((0, _lib.isLocal)() || val) {
    // eslint-disable-next-line no-console
    console.log('-------------getInstallmentsClientScript---local');
    return await compileLocalInstallmentsClientScript();
  }

  const watcher = (0, _watchers.getPayPalSmartPaymentButtonsWatcher)({
    logBuffer,
    cache
  });
  const {
    version
  } = await watcher.get();
  const script = await watcher.read(debug ? _config.INSTALLMENTS_CLIENT_JS : _config.INSTALLMENTS_CLIENT_MIN_JS);
  return {
    script,
    version
  };
}