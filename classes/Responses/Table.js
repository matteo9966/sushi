class TableResponse {
    constructor(coperti,portate,utenti,codiceTavolo){
    
        this.utenti=utenti;
        this.codiceTavolo=codiceTavolo;
        this.portate=portate;
        this.coperti=coperti;
    }
}

module.exports ={TableResponse};