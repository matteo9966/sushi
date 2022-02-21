const storage = require("node-persist");
class Table {
    constructor(coperti,portate){
        this.coperti = coperti //numero
        this.portate = portate //numero
        this.utenti = [];      //array di utenti
        // this.tableData= new TableData()
    }
    
    static async  getTavolo(idTavolo){
         return await storage.getItem(idTavolo);
    }

    static async  getLoggatiTavolo(idTavolo){
        //devo cercare!
        const tavolo = await Table.getTavolo(idTavolo);
        if(Object.keys(tavolo).length<1){
            return 0
        } 
        
        return tavolo.utenti.length;
        
    }

    /**
     * @returns {Promise<{exists:boolean,table:Table}>}
     */
    static async  tableExists(idTavolo){
        const tavolo = await Table.getTavolo(idTavolo);
        if(Object.keys(tavolo).length<1){
            return {exists:false,table:{}};
        }
        return {exists:true,table:tavolo}
    }


    static async  getPortateTavolo(idTavolo){
         const table = await Table.tableExists(idTavolo);
         if(!table.exists){
             return 0
         }
         return table.table.portate;
         
    }

    /**
     * @param {Utente} utente
     * @param {string} idTavolo
     */
    static async  aggiungiUtenteAlTavolo(idTavolo,utente){
       const table = await Table.tableExists(idTavolo);
       if(!table.exists){
           //restituisco qualcosa per dire che non è stato possibile aggiungere utente al tavolo
       }
       const tavolo = table.table;
       console.log(tavolo,utente)
       tavolo.utenti.push(utente);
       console.log(tavolo);
       await storage.updateItem(idTavolo,tavolo); // in questo modo dovrei aggiornare il tavolo
       
       //2 aggiungo al tavolo

    }




}

class Utente {
    constructor(nome,ordinazione=[]){
        this.nome= nome;
        this.ordinazione=ordinazione
    }
}

class Piatto {
    constructor(id,qnt){
        this.id=id;
        this.qnt=qnt;
    }
}
// class TableData {
//     constructor(){
//         this.loggati=0;
//         this.totale
//     }
    
// }

module.exports = {Table,Utente};