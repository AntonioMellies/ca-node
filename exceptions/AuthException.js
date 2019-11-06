const ApiException = require('./ApiException');

class AuthException extends ApiException {
  
    constructor (message) {
      super(message);
      this.message =  message || "Erro de autenticação";
      this.class = this.constructor.name;
      this.status = 401;
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AuthException;