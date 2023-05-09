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
    docente_par : [{
        anio : { type : Schema.ObjectId, ref : 'Periodo' },
        id_usuario : { type : Schema.ObjectId, ref : 'Usuario' },
        id_ficha : { type : Schema.ObjectId, ref : 'Ficha' },
    }],
    instructor_sena : [{
        anio : { type : Schema.ObjectId, ref : 'Periodo' },
        id_usuario : { type : Schema.ObjectId, ref : 'Usuario' },
        id_ficha : { type : Schema.ObjectId, ref : 'Ficha' },
    }],
    
    // Quedamos a la espera de la modificación de estos campos requeridos, 
    documentos_actas : [{
        documento : { type : Schema.ObjectId, ref : '------' },
        comentarios: { type : [String], require : false },
    }],
    creado_el: { type : Date, default: Date.now }
});

module.exports = mongoose.model('MediaTecnica', MediaTecnicaSchema); 