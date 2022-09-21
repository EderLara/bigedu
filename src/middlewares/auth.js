/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

require('dotenv').config();

const jwt = require('jwt-simple')
const moment = require('moment')
const secretkey = process.env.SECRET
const { mensajes } = require('../util/estados')

// Función de payload

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            mensaje : mensajes.m403
        })
    }
    // Cabecera sin comillas dobles o simples (usamos replace funciton):
    let toker = req.headers.authorization.replace(/['"]+/g, '')
    // Intentamos crear el payload:
    try {
        // Decodificar Payload:
        let payload = jwt.decode(token, secretkey);
        // Validamos fecha de caducidad:
        if (payload.exp <= moment().unix()){
            return res.status(401).send({
                'mensaje': mensajes.m401
            })
        }
    }catch(ex){
        return res.status(404).send({
            'mensaje' : mensajes.m404
        })
    }
    // Capturamos el payload:
    req.user = payload

    next();
}