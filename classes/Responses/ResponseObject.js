class ResponseObj {
    errorCode;
    errorDescription;
    payload;
     
    constructor(errorCode=null,errorDescription=null,payload={}){
        this.errorCode=errorCode;
        this.errorDescription=errorDescription;
        this.payload=payload;
    }

}

module.exports = ResponseObj