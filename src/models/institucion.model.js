/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const institucionSchema = Schema({
    nombre_institucion: String,
    ubicacion_geografica : {
        lat : Number,
        lng : Number
    },
    telefono_ie : String,
    rector_ie :  { type : Schema.ObjectId, ref : 'Usuario' },
    coordinador_ie : { type : Schema.ObjectId, ref : 'Usuario' },
    creado_el: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Programa', institucionSchema);