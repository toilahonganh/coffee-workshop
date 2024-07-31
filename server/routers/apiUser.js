const express = require('express');
const routers = express.Router();
const UserModel = require('../models/UserModel');
const { postRegisterController, postLoginController } = require('../controllers/UserController');


routers.post('/register', postRegisterController);
routers.post('/login', postLoginController);


module.exports = routers;