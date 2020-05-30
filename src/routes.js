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

routes.get('/users/:page/:limit', UserController.index);

routes.put('/users/:user_id', UserController.update);
routes.delete('/users/:user_id', UserController.delete);

routes.use(authMiddleware);

routes.get('/users/:user_id/videos/:page/:limit', VideoController.index);
routes.get('/users/:user_id/search/:page/:limit', VideoController.search);
routes.get('/users/:user_id/videos', VideoController.findByPk);
routes.post('/users/:user_id/videos', VideoController.store);
routes.delete('/users/:id/videos', VideoController.delete);
routes.put('/users/:id/videos', VideoController.update);

module.exports = routes;
