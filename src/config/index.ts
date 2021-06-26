let config = require('./config.production');
if (__DEV__) {
  config = require('./config.debug');
}
export default config;
