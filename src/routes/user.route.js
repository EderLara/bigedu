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
api.put('/usuario/:idusuario', userControl.delUser);//No deberia ser el metodo http DELETE?
api.put('/usuario/rol/:usuarioid', userControl.changeRol);
api.get('/usuario/buscar/:idusuario', userControl.findUser);
api.get('/usuario/todos', userControl.listUsers)

module.exports = api;