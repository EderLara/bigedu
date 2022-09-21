/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const express = require('express');
const userControl = require('../controllers/user.control');

const api = express.Router();

// Middleware de autenticación:
const md_auth = require('../middlewares/auth');

// Rutas:
api.get('/testuser', userControl.testControlUser);
api.post('/usuario/nuevo', userControl.saveUser);
api.post('/usuario/login', userControl.loginUser);
api.put('/usuario/:idusuario', userControl.delUser);
api.put('/usuario/rol/:usuarioid', userControl.changeRol);
api.get('/usuario/buscar/:usuario', userControl.findUser);
api.get('/usuario/todos', userControl.listUsers)

module.exports = api;