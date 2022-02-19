const {StatusCodes} = require('http-status-codes');
const createTable = (req,res)=>{
   const {portate,commensali,nome} = req.body;
   if(!portate || !commensali || !nome){
       res.status(StatusCodes.BAD_REQUEST).json({
           msg:"Campi inseriti non validi"
       })
       return;
   }
   res.status(StatusCodes.CREATED).json({msg:"server crea un id e te lo restituisce!"})

}

module.exports = {createTable};