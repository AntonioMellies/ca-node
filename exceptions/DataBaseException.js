const ApiException = require('./ApiException');

class DataBaseException extends ApiException {
  
    constructor (message) {
      super(message);
      this.message =  message || "Erro na comunicação com o banco de dados";
      this.class = this.constructor.name;
      this.status = 500;
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = DataBaseException;