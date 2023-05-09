//fichas, media tecnica,programa, 
/**
 * Aplicación BigEdu
 * @author: aitageo
 * @year  :
 */
"use strict";

const { request } = require("express");
const Media = require("../models/mediatecnica.model");
const { mensajes } = require("../util/estados");

//-------------------------Inicio Crud Mediatecnica-------------------------------------------------------//


function saveMediatecnica(req,res){
    const mediaTecnica = new Media({
        institucion_ie: req.body.institucion_ie,
        docente_par: req.body.docente_par,
        instructor_sena: req.body.instructor_sena,
        documentos_actas: req.body.documentos_actas,
      });
    
      mediaTecnica.save((err, mediaTecnicaStored) => {
        if (err) {
            throw err,
          res.status(500).send({ message: `Error al guardar la media técnica en la base de datos: ${err}` });
        } else {
          res.status(200).send({ mediaTecnica: mediaTecnicaStored });
        }
      });
    }




module.exports = {
    saveMediatecnica,
}