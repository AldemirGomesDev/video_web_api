const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const cors = require('cors')

require('./database');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use(cors());

server.use(routes);

server.listen(3333);