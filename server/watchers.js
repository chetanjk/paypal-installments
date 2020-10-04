"use strict";

exports.__esModule = true;
exports.startWatchers = startWatchers;
exports.cancelWatchers = cancelWatchers;
exports.getPayPalSmartPaymentButtonsWatcher = exports.getPayPalSDKWatcher = void 0;

var _grabthar = require("grabthar");

var _config = require("./config");

let paypalSDKWatcher;
let paypalSmartButtonsWatcher;

const getPayPalSDKWatcher = ({
  logBuffer,
  cache
}) => {
  if (!cache || !logBuffer) {
    throw new Error(`Cache and logBuffer required`);
  }

  paypalSDKWatcher = paypalSDKWatcher || (0, _grabthar.poll)({
    cdnRegistry: _config.SDK_CDN_NAMESPACE,
    name: _config.BUTTON_RENDER_MODULE,
    period: _config.MODULE_POLL_INTERVAL,
    childModules: [_config.BUTTON_RENDER_CHILD_MODULE],
    flat: true,
    dependencies: true,
    logger: logBuffer,
    cache
  });
  return paypalSDKWatcher;
};

exports.getPayPalSDKWatcher = getPayPalSDKWatcher;

const getPayPalSmartPaymentButtonsWatcher = ({
  logBuffer,
  cache
}) => {
  if (!cache || !logBuffer) {
    throw new Error(`Cache and logBuffer required`);
  }

  paypalSmartButtonsWatcher = paypalSmartButtonsWatcher || (0, _grabthar.poll)({
    cdnRegistry: _config.SMART_BUTTONS_CDN_NAMESPACE,
    name: _config.BUTTON_CLIENT_MODULE,
    period: _config.MODULE_POLL_INTERVAL,
    flat: true,
    dependencies: false,
    logger: logBuffer,
    cache
  });
  return paypalSmartButtonsWatcher;
};

exports.getPayPalSmartPaymentButtonsWatcher = getPayPalSmartPaymentButtonsWatcher;

function startWatchers({
  logBuffer,
  cache
} = {}) {
  getPayPalSDKWatcher({
    logBuffer,
    cache
  });
  getPayPalSmartPaymentButtonsWatcher({
    logBuffer,
    cache
  });
}

function cancelWatchers() {
  if (paypalSDKWatcher) {
    paypalSDKWatcher.cancel();
  }

  if (paypalSmartButtonsWatcher) {
    paypalSmartButtonsWatcher.cancel();
  }
}