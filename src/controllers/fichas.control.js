//fichas, media tecnica,programa, 
/**
 * Aplicación BigEdu
 * @author: aitageo
 * @year  :
 */
"use strict";

const { request } = require("express");
const Ficha = require("../models/fichas.model");
const { mensajes } = require("../util/estados");

//-------------------------Inicio Crud Fichas-------------------------------------------------------//

function SaveFicha(req, res) {
  const ficha = new Ficha();
  let params = req.body;
  let numero_ficha = params.numero_ficha;
  let cantidad_aprendices = params.cantidad_aprendices;
  let programa = params.programa;

  //se valida si ya existe
  Ficha.findOne({ numero_ficha: params.numero_ficha }).exec((err, data) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (data) {
      return res.status(200).send({ mensaje: mensajes.m409 });
    } else {
      // se validan los campos obligatorios
      if (params.numero_ficha) {
        ficha.numero_ficha = params.numero_ficha;
        ficha.cantidad_aprendices = params.cantidad_aprendices;
        ficha.programa = params.programa;
        // se crea el schema si no esta y si si guarda el documento
        ficha.save((err, FichaStored) => {
          if (err) throw err;
          if (!FichaStored) {
            return res.status(200).send({ mensaje: mensajes.m409 });
          }
          return res
            .status(200)
            .send({ mensaje: mensajes.m200, FichaStored: FichaStored });
        });
      }
    }
  });
}

//por aitageo sep/1/2023 
function GetFichas(req, res) {
    Ficha.find((err, TodasFichas) => {
        if (err) throw err;
        if (!TodasFichas) {
            return res.status(404).send({ mensaje: mensajes.m404 });
        }
        return res.status(200).send({ mensaje: mensajes.m200, TodasFichas });
    });


}


function GetFicha(req,res){
    let fichaId = req.params.id;
    Ficha.findById(fichaId, (error, FichaFound) => {
        if (error) throw error;
        if (!FichaFound) {
          return res.status(404).send({ mensaje: mensajes.m404 });
        }
        return res.status(200).send({ mensaje: mensajes.m200, FichaFound });
      });
    }



//update ficha    

//toma el id de la ficha lo busca en mongo y lo remueve
function DeleteFicha(req,res){
    let  fichaId = req.params.id;
    Ficha.findByIdAndRemove(fichaId, (error, FichaDelete) => {
        if (error) throw error;
        if (!FichaDelete) {
          return res.status(404).send({ mensaje: mensajes.m404 });
        }
    
        return res.status(200).send({ mensaje: mensajes.m200, FichaDelete });
      });
}    







module.exports = {
    SaveFicha,
    GetFichas,
    GetFicha,
    DeleteFicha,
}