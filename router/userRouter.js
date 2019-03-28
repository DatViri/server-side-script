'use strict';
const express = require('express');
const authController = require('../controller/authController');
const userRouter = express.Router();
const controller = require('../controller/userController');

// register
userRouter.post('/', authController.auth.optional, controller.register);

// activate passport configuration and validate a received password with email.
userRouter.post('/login', authController.auth.optional, controller.login);

// return the currently logged in user.
userRouter.get('/current', authController.auth.required, controller.check);

module.exports = userRouter;
