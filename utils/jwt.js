const config = require('../config');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const AuthException = require('../exceptions/AuthException');
const UserException = require('../exceptions/UserException');

function MiddlewareAuthentication(req, res, next) {
    if (!req.headers.authorization) {
      throw new AuthException("Token não encontrado")
    }
    var token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.TOKEN_SECRET, function(err, payload) {
      if (err) {
        throw new AuthException(err.message);
      }
      // check if the user exists
      userModel.findById(payload.id, function(err, user){
        if (!user){
          throw new UserException();
        } else {
          if(user.email == payload.email){
            //req.user = payload.id;
            next();
          } else {
            throw new UserException();
          }
        }
    });
  });
};

module.exports = [MiddlewareAuthentication];

