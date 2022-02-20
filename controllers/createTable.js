const {StatusCodes} = require('http-status-codes');
const storage = require("node-persist");
const makeid = require('../utils/randomKey');
const createTable = async (req,res)=>{
   const {portate,commensali,nome} = req.body;
   if(!portate || !commensali || !nome){
       res.status(StatusCodes.BAD_REQUEST).json({
           msg:"Campi inseriti non validi"
       })
       return;
   }
   //genero l'otp, controllo, se non esiste la aggiungo al array altrimenti lo rimuovo

   try {
       await storage.setItem('tavolo2',req.body);
          
    } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({msg:"errore interno del serve"}); 
    }
    //è tutto asincrono:
    // async getItem(key)
     const tableId= makeid(5);
     const tavolo = await storage.getItem('tavolo1');
    res.status(StatusCodes.CREATED).json({[tableId]:tavolo});
    
}

module.exports = {createTable};