const {Table} = require('../Table')
class TableResponse extends Table {
    constructor(coperti,portate,utenti,codiceTavolo){
        super(coperti,portate);
        this.utenti=utenti;
        this.codiceTavolo=codiceTavolo;
    }
}

module.exports ={TableResponse};