"use strict";

exports.__esModule = true;
exports.ERROR_CODE = exports.AUTH_ERROR_CODE = exports.EVENT = exports.HTTP_STATUS_CODE = exports.HTTP_CONTENT_DISPOSITION = exports.HTTP_CONTENT_TYPE = exports.HTTP_HEADER = void 0;
const HTTP_HEADER = {
  CONTENT_TYPE: 'content-type',
  CONTENT_DISPOSITION: 'Content-Disposition',
  X_FRAME_OPTIONS: 'X-Frame-Options',
  PP_GEO_LOC: 'pp_geo_loc',
  CACHE_CONTROL: 'cache-control',
  EXPIRES: 'expires',
  CLIENT_METADATA_ID: 'PayPal-Client-Metadata-Id'
};
exports.HTTP_HEADER = HTTP_HEADER;
const HTTP_CONTENT_TYPE = {
  TEXT: 'text/plain',
  HTML: 'text/html',
  JAVASCRIPT: 'application/javascript'
};
exports.HTTP_CONTENT_TYPE = HTTP_CONTENT_TYPE;
const HTTP_CONTENT_DISPOSITION = {
  INLINE: 'inline'
};
exports.HTTP_CONTENT_DISPOSITION = HTTP_CONTENT_DISPOSITION;
const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CLIENT_ERROR: 400,
  SERVER_ERROR: 500
};
exports.HTTP_STATUS_CODE = HTTP_STATUS_CODE;
const EVENT = {
  RENDER: 'render',
  VALIDATION: 'validation',
  ERROR: 'error'
};
exports.EVENT = EVENT;
const AUTH_ERROR_CODE = {
  INVALID_CLIENT: 'invalid_client'
};
exports.AUTH_ERROR_CODE = AUTH_ERROR_CODE;
const ERROR_CODE = {
  VALIDATION_ERROR: 'validation_error'
};
exports.ERROR_CODE = ERROR_CODE;