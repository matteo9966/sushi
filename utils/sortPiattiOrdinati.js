/**
 * @description questa funzione prende in input un tavolo, prende tutti gli ordini e restituisce un array rimappato con idPiatto e quantitaTotale
 *  @example
 *  utente1 : [{id:1,qnt:2},{id:3,qnt:5},{id:10,qnt:10}]             
 *  utente2 : [{id:1,qnt:5},{id:3,qnt:1}]
 *  tavolo :  [{id:1,qnt:7},{id:3,qnt:6},{id:10,qnt:10}] 
         
 */
function sortPiattiOrdinati(table){
    const result  = {}; //result è un oggetto in cui gli id sono la chiave e il valore è la somma delle quantità di ordinazioni per ogni cliente
    const ArrayOfPiatti = [] //arrayOfPiatti è il risultato finale che mi aspetto
    const mappedOrders = [];
    
    table.utenti.forEach(utente=>{
        const mappedOrder = mapArrayToObject(utente.ordinazione); //trasforma l'ordine da un array in un ogetto in cui ogni chiave è l'id del piatto e ogni valore è la sua quantità
        mappedOrders.push(mappedOrder);
    })
  
    const allIdsWithDuplicates =  mappedOrders.reduce((res,el)=>{ // tutte le chiavi anche duplicate in un array
        return [...res,...Object.keys(el)] 
    },[])
    
    const idOfAllOrders = [...new Set(allIdsWithDuplicates)]; // rimuovo i duplicati
    
    idOfAllOrders.forEach(id=>{       //sommo tutti gli ordini per ciascun cliente 
        mappedOrders.forEach(order=>{ 
            if(!result.hasOwnProperty(id)){
                result[id]=0;
            }
            if(order.hasOwnProperty(id)){
                result[id]+=order[id];
            }
        })
    })
     
    for(const [idPiatto,quantita] of Object.entries(result)){  // riconverto in un array l'oggetto che riassume tutto
       const piatto = {id:idPiatto,qnt:quantita};
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