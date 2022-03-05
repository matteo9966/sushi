const {StatusCodes} = require('http-status-codes');
const {Table,Utente,Piatto} = require('../classes/Table');
const {TableResponse} = require('../classes/Responses/Table')
const OrdinazioneResponse = require('../classes/Responses/Ordinazione');
const ResponseObj = require('../classes/Responses/ResponseObject');
const {ErrorCode} = require('../errorcodes/index')
const storage = require("node-persist");
const uniqueTableID = require( '../utils/uniqueTableId');
const e = require('express');

const createTable = async (req,res,next)=>{
    const response = new ResponseObj();
    
    const tableId= await uniqueTableID(5); // 
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
        /** @type {Table}*/
       
        const tavoloConNuovoUtente = await storage.getItem(idTavolo);
         const infoTavolo = new TableResponse(tavoloConNuovoUtente.coperti,tavoloConNuovoUtente.portate,tavoloConNuovoUtente.utenti,idTavolo)
         
         response.payload={infoTavolo,utente};
         res.status(StatusCodes.OK).json(response);
        
    } catch (error) {
        if(error instanceof TypeError){
            console.log(error);
            error.message  = ""
        }
        response.errorCode=ErrorCode.BadRequest.code;
        response.errorDescription=ErrorCode.BadRequest.description+" "+error.message;
        return res.status(StatusCodes.BAD_REQUEST).json(response)
    }
    
}

const addOrdinazioneUtente = async (req,res)=>{
    const response = new ResponseObj();
    const {idUtente,idTavolo,piatti} = req.body;
    if(!idTavolo || !idTavolo || !piatti || piatti && piatti.length <1){
        response.errorCode=ErrorCode.BadRequest.code;
       response.errorDescription=ErrorCode.BadRequest.description;
 
       res.status(StatusCodes.BAD_REQUEST).json(response);
       return;
    } 
    //1 verifico l'esistenza del tavolo, se il tavolo c'è, se l'utente c'è  aggiungo l'ordinazione.
    try {
       const updatedTable = await Table.aggiungiOrdinazioneUtente(idTavolo,idUtente,piatti)
       response.payload=updatedTable;
       return res.status(StatusCodes.OK).json(response);
    }catch(error){
        if(error instanceof TypeError){
            console.log("typeError")
            error.message  = ""
        }
        response.errorCode=ErrorCode.BadRequest.code;
        response.errorDescription=ErrorCode.BadRequest.description+" "+error;
        return res.status(StatusCodes.BAD_REQUEST).json(response);  
    }
    //quello che mi aspetto è un id del utente dal body
}

const getCompleteOrder= async (req,res)=>{
    const response = new ResponseObj();
    const idTavolo = req.params?.id;
    console.log('id del tavolo:',idTavolo);
    if(idTavolo==undefined || idTavolo == null){
        response.errorCode=ErrorCode.BadRequest.code;
       response.errorDescription=ErrorCode.BadRequest.description +"ID Tavolo non inserito";
      return  res.status(StatusCodes.BAD_REQUEST).json(response);
    }
    try {
       const ordinazioneCompleta= await Table.getOrdinazioneCompletaDelTavolo(idTavolo)
       console.log("ordinazione completa:",ordinazioneCompleta);
       response.payload=ordinazioneCompleta;
       return res.status(StatusCodes.OK).json(response);
    } catch (error) {
        if(error instanceof TypeError){
            console.log("typeError")
            error.message  = ""
        }
        response.errorCode=ErrorCode.BadRequest.code;
        response.errorDescription=ErrorCode.BadRequest.description+" "+error;
        return res.status(StatusCodes.BAD_REQUEST).json(response);  
        
    }

}

const clearOrdinazioniDiTuttiGliUtentiAlTavolo = async (req,res) =>{
    const {id:idTavolo} = req.params;

    if(!idTavolo){
        response.errorCode=ErrorCode.BadRequest.code;
        response.errorDescription=ErrorCode.BadRequest.description +"ID Tavolo non inserito";
        return  res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
       const response = new ResponseObj();
       const tavoloAggiornato = await Table.clearOrdinazioniDiTuttiGliUtentiAlTavolo(idTavolo);
       response.payload=tavoloAggiornato;
       return res.status(StatusCodes.OK).json(response);
       
    } catch (error) {
        if(error instanceof TypeError){
            console.log("typeError")
            error.message  = ""
        }
        response.errorCode=ErrorCode.BadRequest.code;
        response.errorDescription=ErrorCode.BadRequest.description+" "+error;
        return res.status(StatusCodes.BAD_REQUEST).json(response);  
    }


}

module.exports = {createTable,allTables,addUserToTable,addOrdinazioneUtente,getCompleteOrder,clearOrdinazioniDiTuttiGliUtentiAlTavolo};