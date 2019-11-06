const ApiException = require('./ApiException');

class UserException extends ApiException {
  
    constructor (message,status) {
      super(message);
      this.message =  message || "Usuario não encontrado";
      this.class = this.constructor.name;
      this.status = status || 404;
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = UserException;