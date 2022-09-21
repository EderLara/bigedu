/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    NickName : String,                                              // Correo Electrónico de ingreso de usuario
    PassUser : String,                                              // Password del usuario
    EstaUser : String,                                              // Estado del Usuario
    TipoUser : { type : Schema.ObjectId, ref: 'TipoUsuario' },      // Tipo de Usuario
    DatosUser : {
        IdenUser : String,                                          // Número de identificación
        NombUser : String,                                          // Nombres del Usuario
        ApelUser : String,                                          // Apellidos del Usuario
        EmaiUser : String,                                          // Correo Electrónico personal del usuario 
        ProgUser : String                                           // Programa al que pertenece el usuario
    },
    creado_el: { type : Date, default: Date.now }                   // Creado el..
})

module.exports = mongoose.model('Usuario', UsuarioSchema)