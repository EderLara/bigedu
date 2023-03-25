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
api.post('/perfiles/nuevo', md_auth.ensureAuth, dimensionControl.saveTipoUser);
api.get('/perfiles/buscar/:id',md_auth.ensureAuth,dimensionControl.getTipoUser);
api.put('/perfiles/actualizar/:id',md_auth.ensureAuth,dimensionControl.updateTipoUser);
api.delete('/perfiles/borrar/:id',md_auth.ensureAuth, dimensionControl.deleteTipoUser);

/* -------------------------------------------------- */

api.post('/programa/nuevo',md_auth.ensureAuth, dimensionControl.savePrograma);
api.get('/programa/todos',md_auth.ensureAuth, dimensionControl.listProgramas);
api.get('/programa/buscar/:id',md_auth.ensureAuth, dimensionControl.getPrograma);
api.put('/programa/actualizar/:id', md_auth.ensureAuth,dimensionControl.UpdateProgram);
api.delete('/programa/borrar/:id',md_auth.ensureAuth, dimensionControl.deleteProgram);

/* -------------------------------------------------- */

api.post('/documento/nuevo',md_auth.ensureAuth, dimensionControl.saveDocumento);
api.get('/documento/buscar/:id',md_auth.ensureAuth, dimensionControl.getDocumento);
api.get('/documento/todos',md_auth.ensureAuth, dimensionControl.getListDocument);
api.put('/documento/actualizar/:id', dimensionControl.UpdateDocument);
api.put('/documento/borrar/:id',md_auth.ensureAuth, dimensionControl.DeleteDocument);


/* -------------------------------------------------- */

api.post('/institucion/nuevo',md_auth.ensureAuth, dimensionControl.saveInstitucion);
api.get('/institucion/todos',dimensionControl.GetListInstitucions);
api.get('/institucion/buscar/:id',md_auth.ensureAuth, dimensionControl.GetInstitucion);
api.put('/institucion/actualizar/:id',md_auth.ensureAuth, dimensionControl.UpdateInstitucion);
api.delete('/institucion/borrar/:id',md_auth.ensureAuth, dimensionControl.DeleteInstituto);

/* -------------------------------------------------- */
api.post('/periodo/nuevo',md_auth.ensureAuth,dimensionControl.savePeriodo);
api.get('/periodo/todos',md_auth.ensureAuth, dimensionControl.getListPeriodos);
api.get('/periodo/buscar/:id',md_auth.ensureAuth, dimensionControl.GetPeriodo);
api.put('/periodo/actualizar/:id',md_auth.ensureAuth, dimensionControl.UpdatePeriodo);
api.delete('/periodo/borrar/:id',md_auth.ensureAuth, dimensionControl.DeletePeriodo);




module.exports = api;