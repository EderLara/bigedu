/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose');
const { async } = require('rxjs');

const Schema = mongoose.Schema;

const TipoUsuarioSchema = Schema({
    nombre_tipoUsuario: String,
    creado_el: { type : Date, default: Date.now }
})

 const tipo = module.exports = mongoose.model('TipoUsuario', TipoUsuarioSchema);

// (async()=>{
//  const tipousuario = await tipo.find();
//  console.log(tipousuario);
// })();