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
api.get('/perfiles/nuevo/:id', dimensionControl.getTipoUser);
api.put('/perfiles/nuevo/:id',dimensionControl.updateTipoUser);
api.post('/programa/nuevo', dimensionControl.savePrograma);


module.exports = api;