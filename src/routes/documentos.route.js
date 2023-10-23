/** 
 * Aplicación BigEdu
 * @author: aitageo
 * @year  :
*/

'use strict';

const express = require('express');
const documentosControl = require('../controllers/documentos.control');


const api = express.Router();

// Middleware de autenticación:
const md_auth = require('../middlewares/auth');



// Rutas:
api.post('/documentos/upload', documentosControl.upload, documentosControl.uploadFile);





module.exports = api;