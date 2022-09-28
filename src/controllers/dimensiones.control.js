/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

// Modelo de datos:
const TipoUser = require('../models/tipouser.model');

const { mensajes } = require('../util/estados');
const momento = require('moment');


/* ---------------------------------------------------- CRUD ---------------------------------------------------- */
function saveTipoUser(req, res){
    let params = req.body;
    let tipouser = new TipoUser();

<<<<<<< HEAD
    TipoUser.findOne({ nombre_tipoUsuario: params.nombre_tipouser }).exec(
      (err, data) => {
        console.log(data);
        if (err) return res.status(500).send({ mensaje: mensajes.m500 });
        if (!data || data.nombre_tipoUsuario != params.nombre_tipouser) {
          // campos obligatorios:
          if (params.nombre_tipouser) {
            tipouser.nombre_tipoUsuario = params.nombre_tipouser;

            tipouser.save((err, tipoStored) => {
              if (err) throw err;
              if (tipoStored) {
                return res.status(200).send({ tipo_user: tipoStored });
              }
            });
          } else {
            return res.status(404).send({ mensaje: mensajes.m000 });
          }
        } else {
          let msj ="El tipo de usuario " + params.nombre_tipouser + " ya existe";
          return res.status(200).send({ mensaje: msj });
        }
      }
    );
=======
    TipoUser.findOne({nombre_tipoUsuario: params.nombre_tipouser}
                    ).exec((err, data)=>{
                        if (err) return res.status(500).send({ mensaje:mensajes.m500 });
                        if (!data || data.nombre_tipoUsuario != params.nombre_tipouser) {
                            // campos obligatorios:
                            if (params.nombre_tipouser) {
                                tipouser.nombre_tipoUsuario = params.nombre_tipouser;

                                tipouser.save((err, tipoStored) => {
                                    if (err) throw err;
                                    if (tipoStored) {
                                        return res.status(200).send({ tipo_user: tipoStored });
                                    }
                                })
                            } else {
                                return res.status(404).send({ mensaje: mensajes.m000 });
                            }
                    }
                });
}

function savePrograma(req, res) {

}

function saveDocumento(req, res) {

}

function saveInstitucion(req, res) {
    
}

function savePeriodo(req, res) {
    
>>>>>>> f0d0a5a03c8511d36f54cfdd93ee9f5b771ce90a
}

module.exports = {
    saveTipoUser,
}