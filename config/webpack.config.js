// Set the `ENV` global variable to be used in the app.
const fs = require('fs');
const chalk = require("chalk");
const path = require('path');
const webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

const appScriptsDir = process.env.IONIC_APP_SCRIPTS_DIR || '@ionic/app-scripts';
const rootDir = process.env.IONIC_ROOT_DIR;

var config = require(path.join(appScriptsDir, 'config', 'webpack.config.js'));


const chackFileExists = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  }
}



var env = process.env.NODE_ENV || 'development';
var configKeyEnvName = (env == 'production') ? 'prod' : 'dev';

config[configKeyEnvName].plugins.push(
  ionicWebpackFactory.getIonicEnvironmentPlugin(),
);

config[configKeyEnvName].plugins.push(
  // Get access to IONIC_ENV, but also get access to NODE_ENV *and* default it to 'development'
  new webpack.EnvironmentPlugin({
    'IONIC_ENV': JSON.stringify(process.env.IONIC_ENV),
    'NODE_ENV': 'development'
  })
);
    
/*
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
*/
module.exports = config;
