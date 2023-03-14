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
    Es_Lider : { type : Boolean, default: false },                  // Lider de programa
    DatosUser : {
        IdenUser : String,                                          // Número de identificación
        NombUser : String,                                          // Nombres del Usuario
        ApelUser : String,                                          // Apellidos del Usuario
        EmaiUser : String,                                          // Correo Electrónico personal del usuario 
        TeleUser : String,                                          // Teléfono del usuario
        ImgeUser : String,                                          // Imagen de perfil de usuario,
        ProfUser : String                                           // Profesión de Usuario
    },
    creado_el: { type : Date, default: Date.now }                   // Creado el..
})

module.exports = mongoose.model('Usuario', UsuarioSchema)

