// Set the `ENV` global variable to be used in the app.
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const chalk = require("chalk");

const appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR || '@ionic/app-scripts';
const rootDir = process.env.IONIC_ROOT_DIR;
var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));


const chackFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  }
}

const envMonitor = () => {
  const _env = process.env.NODE_ENV || 'development';
  var curEnv = {};
  if(_env == 'production') {
      curEnv = require(path.join(rootDir, 'src/environments', 'environment.prod.ts'));
  } else {
      curEnv = require(path.join(rootDir, 'src/environments', 'environment.dev.json'));
  }
  curEnv.environment = _env;
  return curEnv;
}


var env = process.env.NODE_ENV || 'development';
var configKeyEnvName = (env == 'production') ? 'prod' : 'dev';

var envVarDirPath;
var envVars;

try {
  var envFileFullName;
  if (env == 'development') {
    envFileFullName = 'environment.dev.json';
  } else {
    envFileFullName = 'environment.prod.ts';
  }
  /**
   * on production mode -
   *  require from prod.js file his export object that conains the config
   *  values from the server. 
   * on development mode -
   *  require from dev.json file the object that conains the config
   *  values that hardcoded on the file.
   * */

  envVarDirPath = path.join(rootDir, 'src/environments', envFileFullName);
  chackFileExists(envVarDirPath);
  envVars = require(envVarDirPath);
} catch (e) { 
  console.log(e);
  envVars = {};
}

envVars.environment = env;
console.log(JSON.stringify(envVars, undefined, 2));

console.log(envVarDirPath);
console.log(JSON.stringify(config[configKeyEnvName].resolve, undefined, 2));

config[configKeyEnvName].resolve.extensions = ['.prod.ts', '.ts', '.js', '.dev.json', '.json'];
config[configKeyEnvName].resolve.modules.push(path.join(rootDir, 'src/environments'));
config[configKeyEnvName].resolve.alias = {
  "@env": envVarDirPath
};
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
console.log(JSON.stringify(config[configKeyEnvName].resolve, undefined, 2));
/*
if (env === 'production') {
  // This helps ensure the builds are consistent if source hasn't changed:
  config[configKeyEnvName].plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}
*/


module.exports = function () {
  return config;
}