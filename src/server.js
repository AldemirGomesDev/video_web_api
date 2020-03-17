const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

require('./database');

const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(routes);

server.listen(3333);