const { Table, Piatto } = require("../classes/Table");
/**
 * @description questa funzione prende in input un tavolo, prende tutti gli ordini e restituisce un array rimappato con idPiatto e quantitaTotale
 *  @example
 *  utente1 : [{id:1,qnt:2},{id:3,qnt:5},{id:10,qnt:10}]             
 *  utente2 : [{id:1,qnt:5},{id:3,qnt:1}]
 *  tavolo :  [{id:1,qnt:7},{id:3,qnt:6},{id:10,qnt:10}] 
 *  @param {Table} table 
 *  @returns {[Piatto]} array di piatti          
 */
function sortPiattiOrdinati(table){
    const result  = {}; 
    const ArrayOfPiatti = []
    const mappedOrders = [];
    
    table.utenti.forEach(utente=>{
        const mappedOrder = mapArrayToObject(utente.ordinazione);
        mappedOrders.push(mappedOrder);
    })
    
    const allIdsWithDuplicates =  mappedOrders.reduce((res,el)=>{
        return [...res,...Object.keys(el)]
    },[])
    
    const idOfAllOrders = [...new Set(allIdsWithDuplicates)];
    
    idOfAllOrders.forEach(id=>{
        mappedOrders.forEach(order=>{
            if(!result.hasOwnProperty(id)){
                result[id]=0;
            }
            if(order.hasOwnProperty(id)){
                result[id]+=order[id];
            }
        })
    })
     
    for(const [idPiatto,quantita] of Object.entries(result)){
       const piatto = new Piatto(idPiatto,quantita);
       ArrayOfPiatti.push(piatto)
    }
    
    return ArrayOfPiatti; // converti questo result in un array di piatto e hai finito

}
/**
 * @param {[{id:String,qnt:Number}]} arr
 */
function mapArrayToObject(arr){
  const res = {};
  arr.forEach(el=>{
      res[el.id]=el.qnt
  })
  return res;
}


module.exports = sortPiattiOrdinati;