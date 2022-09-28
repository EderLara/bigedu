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
    
}

module.exports = {
    saveTipoUser,
}