"use strict";

exports.__esModule = true;
exports.getInstallmentsMiddleware = getInstallmentsMiddleware;

var _sdkConstants = require("@paypal/sdk-constants");

var _lib = require("./lib");

var _constants = require("./constants");

var _params = require("./params");

var _script = require("./script");

function getInstallmentsMiddleware({
  logger = _lib.defaultLogger,
  content: smartContent,
  cache
} = {}) {
  return (0, _lib.sdkMiddleware)({
    logger,
    cache
  }, {
    app: async ({
      req,
      res,
      params,
      meta,
      logBuffer
    }) => {
      logger.info(req, _constants.EVENT.RENDER);
      const {
        clientID,
        cspNonce,
        debug,
        locale
      } = (0, _params.getParams)(params, req, res);
      const client = await (0, _script.getInstallmentsClientScript)({
        debug,
        logBuffer,
        cache
      });
      const content = smartContent[locale.country][locale.lang] || {};
      logger.info(req, `installments_client_version_${client.version}`);
      logger.info(req, `installments_params`, {
        params: JSON.stringify(params)
      });

      if (!clientID) {
        return (0, _lib.clientErrorResponse)(res, 'Please provide a clientID query parameter');
      }

      const pageHTML = `
                <!DOCTYPE html>
                <head></head>
                <body data-nonce="${cspNonce}" data-client-version="${client.version}">
                    ${meta.getSDKLoader({
        nonce: cspNonce
      })}
                    <script nonce="${cspNonce}">${client.script}</script>
                    <script nonce="${cspNonce}">installmentsModal.setupInstallments(${(0, _lib.safeJSON)({
        cspNonce,
        content
      })})</script>
                </body>
            `;
      (0, _lib.allowFrame)(res);
      return (0, _lib.htmlResponse)(res, pageHTML);
    }
  });
}