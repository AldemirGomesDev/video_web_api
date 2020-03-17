const express = require('express');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("Bem vindo ao grupo");
});

routes.post('/users', UserController.store);

routes.get('/users', UserController.index);

module.exports = routes;
