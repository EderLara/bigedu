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
api.get('/perfiles/buscar/:id', dimensionControl.getTipoUser);
api.put('/perfiles/actualizar/:id',dimensionControl.updateTipoUser);
api.delete('/perfiles/borrar/:id', dimensionControl.deleteTipoUser);

/* -------------------------------------------------- */

api.post('/programa/nuevo', dimensionControl.savePrograma);
api.get('/programa/todos', dimensionControl.listProgramas);
api.get('/programa/buscar/:id', dimensionControl.getPrograma);
api.put('/programa/actualizar/:id', dimensionControl.UpdateProgram);
api.delete('/programa/borrar/:id', dimensionControl.deleteProgram);

/* -------------------------------------------------- */

api.post('/documento/nuevo', dimensionControl.saveDocumento);
api.get('/documento/buscar/:id', dimensionControl.getDocumento);
api.get('/documento/todos', dimensionControl.getListDocument);
api.put('/documento/actualizar/:id', dimensionControl.UpdateDocument);
api.put('/documento/borrar/:id', dimensionControl.DeleteDocument);


/* -------------------------------------------------- */
api.post('/institucion/nuevo', dimensionControl.saveInstitucion);
api.get('/institucion/todos', dimensionControl.GetListInstitucions);
api.get('/institucion/buscar/:id', dimensionControl.GetInstitucion);

module.exports = api;