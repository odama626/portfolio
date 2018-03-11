const dotenv = require('dotenv');

function loadEnvVar(env = '') {
  let newEnv = env.toLowerCase();
  if (['production', 'staging', 'dev'].includes(newEnv)) {
    return newEnv;
  }
  return 'dev';
}

function LoadEnvironment() {
  let env = loadEnvVar(process.env.NODE_ENV);
  let nodes = dotenv.config().parsed;
  let keys = Object.keys(nodes);
  let result = {}
  result[`ENV.DEPLOY_TARGET`] = JSON.stringify(env);
  result[`ENV.TARGET_DEV`] = JSON.stringify('dev');
  result[`ENV.TARGET_STAGING`] = JSON.stringify('staging');
  result[`ENV.TARGET_PRODUCTION`] = JSON.stringify('production');
  result[`ENV.BUILD_TARGET_CLIENT`] = JSON.stringify('client');
  result[`ENV.BUILD_TARGET_SERVER`] = JSON.stringify('server');
  for (let i=0; i< keys.length; i++) {
    result[`ENV.${keys[i]}`] = JSON.stringify(nodes[keys[i]]);
  }
  return result;
}

module.exports = LoadEnvironment;