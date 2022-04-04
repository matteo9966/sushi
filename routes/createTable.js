//quello che posso fare è quando creo il tavolo restitusico un codice univoco al utente
const express = require('express');
const {createTable,allTables,addUserToTable,addOrdinazioneUtente,getCompleteOrder,getThisTable,clearOrdinazioniDiTuttiGliUtentiAlTavolo, clearOrdinazioneUtenteAlTavolo} = require('../controllers/createTable')
const Router = express.Router();
const {logBody} = require('../middleware/logBody');
Router.route('/createTable').post(logBody,createTable,addUserToTable);
Router.route('/newUser').post(logBody,addUserToTable)
Router.route('/allTables').get(logBody,allTables);
Router.route('/newOrder').post(logBody,addOrdinazioneUtente);
Router.route('/complete/:id').get(logBody,getCompleteOrder);
Router.route('/thisTable/:id').get(logBody,getThisTable);
Router.route('/clearOrders/:id').delete(logBody,clearOrdinazioniDiTuttiGliUtentiAlTavolo);
Router.route('/clearSingleOrder/:id/:idUtente').delete(logBody,clearOrdinazioneUtenteAlTavolo)
module.exports = Router;