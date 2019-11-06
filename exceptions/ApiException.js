class ApiException extends Error {
  
  constructor (message,status) {
    super(message);
    this.message =  message || "Erro geral da aplicação";
    this.class = this.constructor.name;
    this.status =  status || 500;
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiException;