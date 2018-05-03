var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

import { ENV } from '@app/env';

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(cors());

configObj = process.env;
ENV['API_URL'] = configObj.API_URL;
ENV['FB_APP_ID'] = configObj.FB_APP_ID;
ENV['GGL_CLIENT_ID'] = configObj.GGL_CLIENT_ID;
ENV['GGL_API_KEY'] = configObj.GGL_API_KEY;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('www'));
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});