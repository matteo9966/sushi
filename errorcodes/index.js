class ErrorCode {
    // Create new instances of the same class as static attributes
    static BadRequest = new ErrorCode(1,"dati inseriti non correttamente");
    static NotFound = new ErrorCode(2,"Valore non trovato");
    static ServerError= new ErrorCode(3,"Errore del server");
  
  
    constructor(code=1,description="Errore") {
      this.code = code;
      this.description = description; 
    }
  }

  module.exports = {ErrorCode};