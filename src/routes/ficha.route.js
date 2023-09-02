/** 
 * Aplicación BigEdu
 * @author: aitageo
 * @year  :
*/

'use strict';

const express = require('express');
const fichasControl = require('../controllers/fichas.control');


const api = express.Router();

// Middleware de autenticación:
const md_auth = require('../middlewares/auth');



// Rutas:
api.post('/fichas/nuevo',fichasControl.SaveFicha);
api.get('/fichas/Todas',fichasControl.GetFichas)



module.exports = api;