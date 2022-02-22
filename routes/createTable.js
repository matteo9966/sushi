//quello che posso fare è quando creo il tavolo restitusico un codice univoco al utente
const express = require('express');
const {createTable,allTables,addUserToTable} = require('../controllers/createTable')
const Router = express.Router();

Router.route('/createTable').post(createTable,addUserToTable);
Router.route('/newUser').post(addUserToTable)
Router.route('/allTables').get(allTables);

module.exports = Router;