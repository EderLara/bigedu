/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PeriodoSchema = Schema({
    año_lectivo: String,
    fecha_inicio : { type : Date },
    fecha_fin : { type : Date },
    estado : { type : Boolean, default : true },
    creado_el: { type : Date, default : Date.now }
})

module.exports = mongoose.model('Periodo', PeriodoSchema);