const {StatusCodes} = require('http-status-codes');
const {Table,Utente} = require('../classes/Table');
const storage = require("node-persist");
const makeid = require('../utils/randomKey');
const createTable = async (req,res)=>{
   const {portate,coperti,nome} = req.body;
   if(!portate || !coperti || !nome){
       res.status(StatusCodes.BAD_REQUEST).json({
           msg:"Campi inseriti non validi"
       })
       return;
   }
   //genero l'otp, controllo, se non esiste la aggiungo al array altrimenti lo rimuovo

   try {
       const tableId= makeid(5);
       const {coperti,portate} = req.body
       const table = new Table(coperti,portate);
       await storage.setItem(tableId,table);
       const tavolo = await storage.getItem(tableId);
       res.status(StatusCodes.CREATED).json({[tableId]:tavolo});
          
    } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({msg:"errore interno del serve"}); 
    }
    //è tutto asincrono:
    // async getItem(key)
    
}

const allTables = async (req,res)=>{
    const tables = await storage.length();
    res.status(200).json({numeroTavoli:tables});
}

const addUserToTable = async (req,res)=>{
    const userData = req.body;
    //io da user mi aspetto nome e  //TODO: considera il caso di nomi duplicati
    const nome = userData.nome;
    const utente = new Utente(nome,[]) // quando aggiungi utente crei un array vuoto
    const idTavolo = userData.idTavolo;
    await Table.aggiungiUtenteAlTavolo(idTavolo,{...utente})
    const tavoloConNuovoUtente = await storage.getItem(idTavolo);
    res.json({tavoloConNuovoUtente});

}

module.exports = {createTable,allTables,addUserToTable};