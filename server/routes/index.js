const Router = require('express').Router();
const UserController = require('../controllers/user-controller');
const AuthMiddleware = require('../middlewares/auth-middleware');

Router.post('/login', UserController.login);
Router.post('/registration', UserController.registration);
Router.post('/logout', UserController.logout);
Router.get('/refresh', UserController.refresh);
Router.get('/activate/:link', UserController.activate);
Router.get('/users', AuthMiddleware, UserController.getUsers);

module.exports = Router;