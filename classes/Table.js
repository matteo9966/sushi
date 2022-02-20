class Table {
    constructor(commensali,portate){
        this.commensali = commensali
        this.portate = portate
        this.utenti = new Utenti();
        this.tableData= new TableData()
    }

}

class Utenti {
    constructor(){
        this.utenti= {}
    }
}

class TableData {
    constructor(numero_utenti){
        this.numero_utenti=numero_utenti;
        this.loggati=0;
    }
    
}