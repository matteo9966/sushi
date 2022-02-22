const storage = require("node-persist");
const makeid = require('./randomKey');
async function uniqueTableID(num){
   let id = makeid(num);
   const allTablesIDS = await storage.keys();
   while(allTablesIDS.includes(id)){
      id = makeid(num);
   }

   return id;

}


module.exports = uniqueTableID