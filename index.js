'use strict';

var bodyParser = require('body-parser');
var hash = require('./routes/hash');
var keys = require('./routes/keys');
var express = require('express');


var app, port, server;

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/keys', keys);
app.use('/hash', hash);
port = process.env.PORT || 8000;
app.listen(port);
