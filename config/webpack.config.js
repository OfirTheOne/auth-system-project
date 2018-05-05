// Set the `ENV` global variable to be used in the app.
const path = require('path');
const webpack = require('webpack');

const appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR || path.join(process.env.npm_config_prefix, '/lib/node_modules/npm/node_modules/@ionic/app-scripts');
console.log(JSON.stringify(process.env, undefined, 2));

console.log('here1', appScriptsDir);
var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));
console.log('here2');
//console.log(config);
var env = process.env.NODE_ENV || 'development';

console.log(env);

var envVars;
try {
  let envFileFullName;
  if (env == 'development') {
    envFileFullName = 'dev.json';
  } else {
    envFileFullName = 'prod.js';
  }

  /**
   * on production mode -
   *  require from prod.js file his export object that conains the config
   *  values from the server. 
   * on development mode -
   *  require from dev.json file the object that conains the config
   *  values that hardcoded on the file.
   * */

  envVars = require(path.join('../env', envFileFullName));
} catch (e) {
 
  console.log('here3', e);
  envVars = {};
}

envVars.environment = env;

let configKeyEnvName = (env == 'production') ? 'prod' : 'dev';
//config.plugins = config.plugins || [];
config[configKeyEnvName].plugins.push(
  new webpack.DefinePlugin({
    ENV: JSON.stringify(envVars)
  })
);

console.log(JSON.stringify(config[configKeyEnvName].plugins, undefined, 2));

if (env === 'production') {
  // This helps ensure the builds are consistent if source hasn't changed:
  config[configKeyEnvName].plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = config;