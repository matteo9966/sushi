//quello che posso fare è quando creo il tavolo restitusico un codice univoco al utente
const express = require('express');
const {createTable,allTables,addUserToTable,addOrdinazioneUtente,getCompleteOrder,getThisTable} = require('../controllers/createTable')
const Router = express.Router();

Router.route('/createTable').post(createTable,addUserToTable);
Router.route('/newUser').post(addUserToTable)
Router.route('/allTables').get(allTables);
Router.route('/newOrder').post(addOrdinazioneUtente);
Router.route('/complete/:id').get(getCompleteOrder);
Router.route('/thisTable/:id').get(getThisTable);

module.exports = Router;