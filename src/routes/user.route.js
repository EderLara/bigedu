/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const express = require('express');
const userControl = require('../controllers/user.control');
const mailer = require('../controllers/mailer.control');

const api = express.Router();

// Middleware de autenticación:
const md_auth = require('../middlewares/auth');
const multiparty = require('connect-multiparty');
let MiddlewareUploads = multiparty({ uploadDir:'src/assets/img'});

// Rutas:
api.get('/testuser', userControl.testControlUser);
api.post('/usuario/nuevo',userControl.saveUser);
api.post('/usuario/login', userControl.loginUser);
api.put('/usuario/:idusuario',md_auth.ensureAuth, userControl.delUser);//No deberia ser el metodo http DELETE?
api.put('/usuario/rol/:idusuario', md_auth.ensureAuth,userControl.changeRol);
api.get('/usuario/buscar/:idusuario',md_auth.ensureAuth, userControl.findUser);
api.get('/usuario/todos',md_auth.ensureAuth, userControl.listUsers);
api.post('/usuario/image/:id',[MiddlewareUploads,md_auth.ensureAuth],userControl.UploadImage);
api.post('/correo',mailer.envioCorreo);

module.exports = api;