const Router = require('express').Router();
const UserController = require('../controllers/user-controller');

Router.post('/login');
Router.post('/registration');
Router.post('/logout');
Router.get('/refresh');
Router.get('/activate/:link');
Router.get('/users', UserController.getUsers);

module.exports = Router;