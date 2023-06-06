const Router = require('express').Router();
const UserController = require('../controllers/user-controller');

Router.post('/login', UserController.login);
Router.post('/registration', UserController.registration);
Router.post('/logout', UserController.logout);
Router.get('/refresh', UserController.refresh);
Router.get('/activate/:link', UserController.activate);
Router.get('/users', UserController.getUsers);

module.exports = Router;