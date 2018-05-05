// Set the `ENV` global variable to be used in the app.
var path = require('path');
var webpack = require('webpack');

var projectRootDir = process.env.IONIC_ROOT_DIR;
var appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR;

var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));
console.log(config);

var env = process.env.NODE_ENV || 'development';
console.log(env);
let modePlugins;
var envVars;
try {
let envFileFullName;
  if(env == 'development') {
    envFileFullName = 'dev.json'; 
    modePlugins = config['dev'].plugins;
  } else {
    envFileFullName = 'prod.js';
    modePlugins = config['prod'].plugins;
  }
  /*
  * on production mode -
  *  require from prod.js file his export object that conains the config
  *  values from the server. 
  * on development mode -
  *  require from dev.json file the object that conains the config
  *  values that hardcoded on the file.
  * */
  envVars = require(path.join(projectRootDir, 'env', envFileFullName));
} catch(e) {
  console.log(e);
  envVars = {};
}

envVars.environment = env;

//config.plugins = config.plugins || [];
modePlugins.push(
  new webpack.DefinePlugin({
    ENV: JSON.stringify(envVars)
  })
);

console.log(JSON.stringify(config.plugins, undefined, 2));

if(env === 'prodoction') {
  // This helps ensure the builds are consistent if source hasn't changed:
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = config;