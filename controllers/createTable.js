const {StatusCodes} = require('http-status-codes');
const {Table,Utente} = require('../classes/Table');
const {TableResponse} = require('../classes/Responses/Table')
const ResponseObj = require('../classes/Responses/ResponseObject');
const {ErrorCode} = require('../errorcodes/index')
const storage = require("node-persist");
const makeid = require('../utils/randomKey');
const uniqueTableID = require( '../utils/uniqueTableId');

const createTable = async (req,res,next)=>{
    const response = new ResponseObj();
    
    const tableId= await uniqueTableID(5); // TODO: la funzione deve essere univoca
   const {portate,coperti,nome} = req.body;
   if(!portate || !coperti || !nome){
       response.errorCode=ErrorCode.BadRequest.code;
       response.errorDescription=ErrorCode.BadRequest.description;
 
       res.status(StatusCodes.BAD_REQUEST).json(response);
       return;
   }
 

   try {
       const {coperti,portate} = req.body
       const table = new Table(coperti,portate);
       await storage.setItem(tableId,table);
    //    /** @type {Table}*/
    //    const tavolo = await storage.getItem(tableId);
    //    const infoTavolo = new TableResponse(tavolo.coperti,tavolo.portate,tavolo.utenti,tableId)
    //    response.payload=infoTavolo;
    //    res.status(StatusCodes.CREATED).json(infoTavolo);
          
    } catch (error) {
       response.errorCode= ErrorCode.ServerError.code
       response.errorDescription= ErrorCode.ServerError.description;
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response); 
    }

    req.body = {nome:nome,idTavolo:tableId} //questo è il payload che va al middleware per aggiungere un utente al tavolo
    next();
    
}

const allTables = async (req,res)=>{
    const tables = await storage.length();
    res.status(200).json({numeroTavoli:tables});
}


const addUserToTable = async (req,res)=>{
    
 
    const response = new ResponseObj();
    const userData = req.body;
    
    

    //io da user mi aspetto nome e  //TODO: considera il caso di nomi duplicati
    const nome = userData?.nome;
    const utente = new Utente(nome,[]) // quando aggiungi utente crei un array vuoto
    const idTavolo = userData?.idTavolo;
    
    if(!nome || !idTavolo){
       response.errorCode=ErrorCode.BadRequest.code;
       response.errorDescription=ErrorCode.BadRequest.description;
       return res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    //controllo se tavolo esiste //controllo se i dati sono tutti presenti
    try {
        await Table.aggiungiUtenteAlTavolo(idTavolo,{...utente})
        
    } catch (error) {
        response.errorCode=ErrorCode.BadRequest.code;
        response.errorDescription=ErrorCode.BadRequest.description+" "+error;
        return res.status(StatusCodes.BAD_REQUEST).json(response)
    }
     /** @type {Table}*/
    
     const tavoloConNuovoUtente = await storage.getItem(idTavolo);
      const infoTavolo = new TableResponse(tavoloConNuovoUtente.coperti,tavoloConNuovoUtente.portate,tavoloConNuovoUtente.utenti,idTavolo)
      response.payload=infoTavolo;
      res.status(StatusCodes.OK).json(response);
    
}

module.exports = {createTable,allTables,addUserToTable};