const storage = require("node-persist");
const makeid = require("../utils/randomKey");
const sortPiattiOrdinati = require('../utils/sortPiattiOrdinati');
class Table {
  constructor(coperti, portate) {
    this.coperti = coperti; //numero
    this.portate = portate; //numero
    /**@type {[Utente]} */
    this.utenti = []; //array di utenti
    // this.tableData= new TableData()
  }

  static async getTavolo(idTavolo) {
    try{
      return await storage.getItem(idTavolo);

    }catch(err){
      throw new Error("ID tavolo non corretto")
    }
  }

  static async getLoggatiTavolo(idTavolo) {
    //devo cercare!
    const tavolo = await Table.getTavolo(idTavolo);
    if (Object.keys(tavolo).length < 1) {
      return 0;
    }

    return tavolo.utenti.length;
  }

  /**
   * @returns {Promise<{exists:boolean,table:Table}>}
   */
  static async tableExists(idTavolo) {
    
    const tavolo = await Table.getTavolo(idTavolo);
    if(!tavolo){
      return  { exists: false, table: {} }
    }
    if (Object.keys(tavolo).length < 1) {
      return { exists: false, table: {} };
    }
    return { exists: true, table: tavolo };
  }

  static async getPortateTavolo(idTavolo) {
    const table = await Table.tableExists(idTavolo);
    if (!table.exists) {
      return 0;
    }
    return table.table.portate;
  }

  /**
   * @param {Utente} utente
   * @param {string} idTavolo
   */
  static async aggiungiUtenteAlTavolo(idTavolo, utente) {
  
    const table = await Table.tableExists(idTavolo);
    if (!table.exists) {
      throw new Error("Id tavolo non corretto");
    }

    const tavolo = table.table;
    tavolo.utenti.push(utente);
  
    await storage.updateItem(idTavolo, tavolo); // in questo modo dovrei aggiornare il tavolo

    //2 aggiungo al tavolo
  }

  /**
   * @param {String} idTavolo
   * @param {String} idUtente
   * @param {[Piatto]} piatti
   */
  static async aggiungiOrdinazioneUtente(idTavolo, idUtente, piatti) {
     
    try {
      const table = await Table.tableExists(idTavolo);
      if (!table.exists) {
        throw new Error("ID tavolo non presente");
      }
      if(!Table.utenteFaParteDelTavolo(idUtente,table.table)){
          throw new Error("ID utente non presente in questo tavolo");
      }
      //arrivati qui, tavolo esiste, utente esiste, ora aggiungo i piatti al utente
      const index= table.table.utenti.findIndex(utente=>utente.id===idUtente);
      const mappedPiatti = piatti.filter(piatto=>{ //se manca informazione id o piatto restituisci falso
        if(!piatto.id || !piatto.qnt){
          return false
        }
        return true
      })
      table.table.utenti[index].ordinazione=mappedPiatti;
      await storage.updateItem(idTavolo, table.table);
      return table.table
    } catch (err) {
        throw err
    }
  }

  /**@param {Table} table */
  static utentiTavolo(table) {

    const utenti = table.utenti.map((utente) => ({
      nome: utente.nome,
      id: utente.id,
    }));
    return utenti
  }

/**
 * @param {Table} table 
 * @param {string} idUtente 
 * 
*/
  static utenteFaParteDelTavolo(idUtente,table){
      const utenti = Table.utentiTavolo(table);    
      for(let i = 0 ; i< utenti.length; i++){
    
         if(utenti[i].id.normalize()==idUtente.normalize()){
             return true
         }
         
      }
        return false
       
        
  }

  static async getOrdinazioneCompletaDelTavolo(idTavolo){
    try {
      const table = await Table.tableExists(idTavolo);
     
      if (!table.exists) {
        throw new Error("ID tavolo non presente");
      }
      const ordinazioneCompleta = sortPiattiOrdinati(table.table);
  

      return ordinazioneCompleta
      
    } catch (err) {
        throw err
    }
  }

  static async clearOrdinazioniDiTuttiGliUtentiAlTavolo(idTavolo){
    try{
      const table = await Table.tableExists(idTavolo);
     
      if (!table.exists) {
        throw new Error("ID tavolo non presente");
      }

      const newTableSenzaOrdinazioni= table.table.utenti.forEach(utente=>utente.ordinazione=[]);
      await storage.updateItem(idTavolo, table.table);
      return table.table



    }catch(err){
      throw err
    }


  }

}

class Utente {
  constructor(nome, ordinazione = []) {
    this.nome = nome;
    this.ordinazione = ordinazione;
    this.id = makeid(6);
  }
}

class Piatto {
  constructor(id, qnt) {
    this.id = id;
    this.qnt = qnt;
  }
}


module.exports = { Table, Utente, Piatto };
