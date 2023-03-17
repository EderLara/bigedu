/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ProgramaSchema = Schema({
    codigo_programa : String,
    nombre_programa : String,
    version_programa : String,
    descripcion_programa : String,
    estado : { type : Boolean, default: true },                  // Lider de programa
    creado_el: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Programa', ProgramaSchema);