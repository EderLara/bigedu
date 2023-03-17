/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TipoDocumentoIdSchema = Schema({
    nombre_tipoDocumento: String,
    creado_el: { type : Date, default: Date.now }
})

 const tipo = module.exports = mongoose.model('TipoDocuId', TipoDocumentoIdSchema);