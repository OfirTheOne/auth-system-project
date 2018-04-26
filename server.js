var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(res, res, next) {
    res.header("Access-Control-Allow-Orgin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Orgin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static('WWW'))
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log(`server listening on port ${app.get('port')}`);
})
