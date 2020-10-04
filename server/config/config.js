"use strict";

exports.__esModule = true;
exports.SMART_BUTTONS_CDN_NAMESPACE = exports.SDK_CDN_NAMESPACE = exports.BROWSER_CACHE_TIME = exports.INSTALLMENTS_CLIENT_MIN_JS = exports.INSTALLMENTS_CLIENT_JS = exports.BUTTON_CLIENT_MODULE = exports.BUTTON_RENDER_CHILD_MODULE = exports.BUTTON_RENDER_MODULE = exports.WEBPACK_CONFIG = exports.MODULE_POLL_INTERVAL = void 0;

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MODULE_POLL_INTERVAL = 5 * 60;
exports.MODULE_POLL_INTERVAL = MODULE_POLL_INTERVAL;
const WEBPACK_CONFIG = 'webpack.config';
exports.WEBPACK_CONFIG = WEBPACK_CONFIG;
const BUTTON_RENDER_MODULE = '@paypal/sdk-release';
exports.BUTTON_RENDER_MODULE = BUTTON_RENDER_MODULE;
const BUTTON_RENDER_CHILD_MODULE = '@paypal/checkout-components';
exports.BUTTON_RENDER_CHILD_MODULE = BUTTON_RENDER_CHILD_MODULE;
const BUTTON_CLIENT_MODULE = _package.default.name;
exports.BUTTON_CLIENT_MODULE = BUTTON_CLIENT_MODULE;
const INSTALLMENTS_CLIENT_JS = 'dist/installments.js';
exports.INSTALLMENTS_CLIENT_JS = INSTALLMENTS_CLIENT_JS;
const INSTALLMENTS_CLIENT_MIN_JS = 'dist/installments.min.js';
exports.INSTALLMENTS_CLIENT_MIN_JS = INSTALLMENTS_CLIENT_MIN_JS;
const BROWSER_CACHE_TIME = 6 * 60 * 60;
exports.BROWSER_CACHE_TIME = BROWSER_CACHE_TIME;
const SDK_CDN_NAMESPACE = 'https://www.paypalobjects.com/js-sdk-release';
exports.SDK_CDN_NAMESPACE = SDK_CDN_NAMESPACE;
const SMART_BUTTONS_CDN_NAMESPACE = 'https://www.paypalobjects.com/smart-payment-buttons';
exports.SMART_BUTTONS_CDN_NAMESPACE = SMART_BUTTONS_CDN_NAMESPACE;