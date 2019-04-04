'use strict';
const express = require('express');
const Users = require('../model/userModel');
const passport = require('passport');
const httpStatus = require('http-status-codes');

exports.register = (req, res, next)=>{
  const {user} = req.body;

  if (!user.email) {
    return res.status(httpStatus.BAD_REQUEST).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);
  console.log(finalUser);

  return finalUser.save()
      .then(() => res.json({user: finalUser.toAuthJSON()}));
};

exports.login = (req, res, next)=> {
  const {user} = req.body;

  if (!user.email) {
    return res.status(httpStatus.BAD_REQUEST).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local',
      {session: false}, (err, passportUser, info) => {
        if (err) {
          return res.status(httpStatus.BAD_REQUEST).json({
            errors: {
              msg: err,
            },
          });
        }

        if (passportUser) {
          return res.json({user: passportUser.toAuthJSON()});
        }

        return res.sendStatus(httpStatus.BAD_REQUEST);
      })(req, res, next);
};

exports.check = (req, res, next)=>{
  const {payload: {id}} = req;

  return Users.findById(id)
      .then((user) => {
        if (!user) {
          return res.sendStatus(httpStatus.BAD_REQUEST);
        }

        return res.json({user: user.toAuthJSON()});
      });
};
