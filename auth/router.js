'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('../config.js');
const router = express.Router();

const createAuthToken = function(user) {
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

router.use(bodyParser.json());
// The user provides a username and password to login
router.post('/login', (req, res) => {
  // const localAuth = passport.authenticate('local', {session: false }, function(err, user, info) {
  //   console.log(info)
  //   if(err) {
  //     console.log(info);
  //     return res.json(err);
  //   }
    const authToken = createAuthToken(req.user.serialize());
    res.json({authToken});
  // });
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

module.exports = {router};