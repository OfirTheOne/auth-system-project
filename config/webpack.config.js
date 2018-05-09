// Set the `ENV` global variable to be used in the app.
const path = require('path');
const webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);
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
      curEnv = require(path.join(rootDir, 'src/environments', 'environment.prod'));
  } else {
      curEnv = require(path.join(rootDir, 'src/environments', 'environment.dev.json'));
  }
  curEnv.environment = _env;
  return curEnv;
}


var env = process.env.NODE_ENV || 'development';
var configKeyEnvName = (env == 'production') ? 'prod' : 'dev';




config[configKeyEnvName] = {
  entry: process.env.IONIC_APP_ENTRY_POINT,
  output: {
    path: '{{BUILD}}',
    publicPath: 'build/',
    filename: process.env.IONIC_OUTPUT_JS_FILE_NAME,
    devtoolModuleFilenameTemplate: ionicWebpackFactory.getSourceMapperFunction(),
  },
  devtool: process.env.IONIC_SOURCE_MAP_TYPE,

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [path.resolve('node_modules')]
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: process.env.IONIC_WEBPACK_LOADER
      }
    ]
  },

  plugins: [
    ionicWebpackFactory.getIonicEnvironmentPlugin(),
    // Get access to IONIC_ENV, but also get access to NODE_ENV *and* default it to 'development'
    new webpack.EnvironmentPlugin({
      'IONIC_ENV': JSON.stringify(process.env.IONIC_ENV),
      'NODE_ENV': 'development'
    })
  ],

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

module.exports = config;
/*
var envVarDirPath;
var envVars;

try {
  var envFileFullName;
  if (env == 'development') {
    envFileFullName = 'environment.dev.json';
  } else {
    envFileFullName = 'environment.prod';
  }
 

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
*/

 /**
   * on production mode -
   *  require from prod.js file his export object that conains the config
   *  values from the server. 
   * on development mode -
   *  require from dev.json file the object that conains the config
   *  values that hardcoded on the file.
   * */

// console.log(JSON.stringify(config[configKeyEnvName].resolve, undefined, 2));
/*
config[configKeyEnvName].resolve.extensions = ['.prod.ts', '.ts', '.js', '.dev.json', '.json'];

config[configKeyEnvName].resolve.modules= [path.join(rootDir, 'src/environments')].concat(config[configKeyEnvName].resolve.modules);
config[configKeyEnvName].resolve.alias = {
  "environment": envVarDirPath
};
*/
//console.log(JSON.stringify(process.env, undefined, 2));
/*
config[configKeyEnvName].plugins.push(
  ionicWebpackFactory.getIonicEnvironmentPlugin(),
  new webpack.EnvironmentPlugin(['IONIC_ENV'])
);
*/
/*
new webpack.DefinePlugin({
  API_URL : JSON.stringify(envVars.API_URL),
  FB_APP_ID : JSON.stringify(envVars.FB_APP_ID),
  GGL_CLIENT_ID : JSON.stringify(envVars.GGL_CLIENT_ID),
  GGL_API_KEY : JSON.stringify(envVars.GGL_API_KEY)
})
*/
//console.log(JSON.stringify(config[configKeyEnvName], undefined, 2));
/*
if (env === 'production') {
  // This helps ensure the builds are consistent if source hasn't changed:
  config[configKeyEnvName].plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}
*/

/*
module.exports = function () {
  return config;
}
*/