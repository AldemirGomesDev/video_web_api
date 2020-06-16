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
routes.post('/users/:user_id/logout', UserController.logout);
routes.get('/user/admin/:registration', UserController.findByRegistration);

routes.use(authMiddleware);

routes.get('/users/:page/:limit', UserController.index);
routes.get('/user/:id', UserController.findByPk);
routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

routes.get('/users/videos/:page/:limit', VideoController.index);
routes.get('/video/search/:page/:limit', VideoController.search);
routes.get('/video/:id', VideoController.findByPk);
routes.post('/video/:user_id', VideoController.store);
routes.delete('/video/:id', VideoController.delete);
routes.put('/video/:id', VideoController.update);

module.exports = routes;
