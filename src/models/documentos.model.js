/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const DocumentoSchema = Schema({
    ficha : { type : Schema.ObjectId, ref: 'Ficha' },      // Programa de formación
    nombre_documento: String,
    descripcion_documento : String,
    formato_documento : String,
    Estado: String,
    fecha_inicio : { type : Date },
    fecha_limite : { type : Date },
    creado_el: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Documento', DocumentoSchema);