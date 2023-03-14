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
    departamento : String,
    municipio: String,
    ubicacion_geografica : {
        lat : Number,
        lng : Number
    },
    telefonos_ie : {
        telefono_ie : String,
        telefono_rector : String,
        telefono_coordinador:String
    },
    rector_ie :  { type : Schema.ObjectId, ref : 'Usuario' },
    coordinador_ie : { type : Schema.ObjectId, ref : 'Usuario' },
    creado_el: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Institucion', institucionSchema);