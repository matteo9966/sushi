//quello che posso fare è quando creo il tavolo restitusico un codice univoco al utente
const express = require('express');
const {createTable} = require('../controllers/createTable')
const Router = express.Router();

Router.route('/createTable').post(createTable);

module.exports = Router;