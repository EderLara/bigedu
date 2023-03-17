/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const FichaSchema = Schema({
    numero_ficha: String,                                       
    cantidad_aprendices : Number,
    programa : { type : Schema.ObjectId, ref: 'Programa' },         // Programa de formación
    periodo : {                                                     // Periodo lectivo de formación
       anio_lectivo : { type : Schema.ObjectId, ref: 'Periodo' },
       grado_formación: String                                      // 10 u 11         
    }, 
    Estado: String,
    fecha_inicio : { type : Date },
    creado_el: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Ficha', FichaSchema);

