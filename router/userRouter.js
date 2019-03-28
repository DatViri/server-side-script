'use strict';
const express = require('express');
const controller = require('../controller/userController');
const userRouter = express.Router();
const Users = require('../model/userModel');
const passport = require('passport');

// register
userRouter.post('/', controller.auth.optional, (req, res, next)=>{
  const {body: {user}} = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
      .then(() => res.json({user: finalUser.toAuthJSON()}));
});

// activate passport configuration and validate a received password with email.
userRouter.post('/login', controller.auth.optional, (req, res, next)=>{
  const {body: {user}} = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local',
      {session: false}, (err, passportUser, info) => {
        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();

          return res.json({user: user.toAuthJSON()});
        }

        return status(400).info;
      })(req, res, next);
});

// return the currently logged in user.
userRouter.get('/current', controller.auth.required, (req, res, next)=>{
  const {payload: {id}} = req;

  return Users.findById(id)
      .then((user) => {
        if (!user) {
          return res.sendStatus(400);
        }

        return res.json({user: user.toAuthJSON()});
      });
});

module.exports = userRouter;
