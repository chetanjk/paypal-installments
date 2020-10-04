"use strict";

exports.__esModule = true;
exports.getParams = getParams;

var _sdkConstants = require("@paypal/sdk-constants");

function getNonce(res) {
  let nonce = res.locals && res.locals.nonce;

  if (!nonce || typeof nonce !== 'string') {
    nonce = '';
  }

  return nonce;
}

function getParams(params, req, res) {
  const {
    env,
    clientID,
    locale = {},
    debug = false
  } = params;
  const {
    country = _sdkConstants.DEFAULT_COUNTRY,
    lang = _sdkConstants.COUNTRY_LANGS[country][0]
  } = locale;
  const cspNonce = getNonce(res);
  return {
    env,
    clientID,
    cspNonce,
    debug: Boolean(debug),
    locale: {
      country,
      lang
    }
  };
}