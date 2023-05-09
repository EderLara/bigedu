/** 
 * Aplicación BigEdu
 * @author: aitageo
 * @year  :
*/

'use strict';

const express = require('express');
const mediaTecnicaControl = require('../controllers/mediatecnica.control');


const api = express.Router();

// Middleware de autenticación:
const md_auth = require('../middlewares/auth');



// Rutas:
api.post('/mediatecnica/nuevo',mediaTecnicaControl.saveMediatecnica);



module.exports = api;