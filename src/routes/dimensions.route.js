/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const express = require('express');
const dimensionControl = require('../controllers/dimensiones.control');
const api = express.Router();
// Middleware de autenticación:
const md_auth = require('../middlewares/auth');

//Rutas:
api.post('/perfiles/nuevo', dimensionControl.saveTipoUser);

module.exports = api;