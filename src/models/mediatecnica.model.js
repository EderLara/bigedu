/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const MediaTecnicaSchema = Schema({
    institucion_ie : { type : Schema.ObjectId, ref : 'Institucion' },
    año_lectivo : { type : Schema.ObjectId, ref : 'Periodo' },
    docentes_par : [{
        id_usuario : Array [{ type : Schema.ObjectId, ref : 'Usuario' }],
        id_ficha : Array [{ type : Schema.ObjectId, ref : 'Ficha' }],
    }],
    instructor_sena : [{
        id_usuario : Array [{ type : Schema.ObjectId, ref : 'Usuario' }],
        id_ficha : Array [{ type : Schema.ObjectId, ref : 'Ficha' }],
    }],
    creado_el: { type : Date, default: Date.now }
});

module.exports = mongoose.model('MediaTecnica', MediaTecnicaSchema);