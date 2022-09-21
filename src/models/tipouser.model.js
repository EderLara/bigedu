/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const TipoUsuarioSchema = Schema({
    nombre_tipoUsuario: String,
    creado_el: { type : Date, default: Date.now }
})

module.exports = mongoose.model('TipoUsuario', TipoUsuarioSchema);