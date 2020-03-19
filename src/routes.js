const express = require('express');
const UserController = require('./controllers/UserController');
const VideoController = require('./controllers/VideoController');

const authMiddleware = require('./middlewares/auth');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send("Bem vindo ao grupo");
});

routes.post('/users', UserController.store);
routes.post('/users/authenticate', UserController.auth);

routes.get('/users', UserController.index);

routes.use(authMiddleware);

routes.get('/users/:user_id/videos', VideoController.index);
routes.post('/users/:user_id/videos', VideoController.store);

module.exports = routes;
