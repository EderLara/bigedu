/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const institucionSchema = Schema({
    sector_educativo : { type: Schema.ObjectId, ref : 'SectorEdu'},
    nombre_institucion : String,
    nit_institución : String,
    codigo_resolucion : String,
    fecha_resolucion : { type : Date },
    codigo_dane : String,
    departamento : String,
    nombre_rector:String,
    nombre_coordinador:String,
    municipio : String,
    direccion : String,
    zona_ubicacion: String,
    ubicacion_geografica : {
        lat : Number,
        lng : Number
    },
    telefonos_ie : {
        telefono_ie : String,
        telefono_rector : String,
        telefono_coordinador : String
    },
    rector_ie :  { type : Schema.ObjectId, ref : 'Usuario' },
    coordinador_ie : { type : Schema.ObjectId, ref : 'Usuario' },
    creado_el: { type : Date, default: Date.now }
})

module.exports = mongoose.model('Institucion', institucionSchema);