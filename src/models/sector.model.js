/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SectorEducativoSchema = Schema({
    sector_pertenece: String,
    creado_el: { type : Date, default: Date.now }
})

 const tipo = module.exports = mongoose.model('SectorEdu', SectorEducativoSchema);