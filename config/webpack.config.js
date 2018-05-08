// Set the `ENV` global variable to be used in the app.
const path = require('path');
const webpack = require('webpack');

const appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR || '@ionic/app-scripts';
const rootDir = process.env.IONIC_ROOT_DIR;

var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));

console.log(require('../env/env-monitor').default);

var env = process.env.NODE_ENV || 'development';
let envVarDirPath;
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

  envVarDirPath = path.join(rootDir, 'env', envFileFullName);
  envVars = require(envVarDirPath);
  
} catch (e) {
 
  console.log(e);
  envVars = {};
}

envVars.environment = env;

let configKeyEnvName = (env == 'production') ? 'prod' : 'dev';

config[configKeyEnvName].resolve.alias = {
  "@myenv": envVarDirPath
};

//process.env = Object.assign(process.env, envVars);
console.log(JSON.stringify(process.env, undefined, 2));
/*
config[configKeyEnvName].plugins.push(
  new webpack.DefinePlugin({
    API_URL : JSON.stringify(envVars.API_URL),
    FB_APP_ID : JSON.stringify(envVars.FB_APP_ID),
    GGL_CLIENT_ID : JSON.stringify(envVars.GGL_CLIENT_ID),
    GGL_API_KEY : JSON.stringify(envVars.GGL_API_KEY)
  })
);
*/
console.log(JSON.stringify(config[configKeyEnvName].plugins, undefined, 2));

if (env === 'production') {
  // This helps ensure the builds are consistent if source hasn't changed:
  config[configKeyEnvName].plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = config;