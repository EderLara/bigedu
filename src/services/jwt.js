'use strict';

require('dotenv').config();

const jwt = require('jwt-simple')
const momento = require('moment')
const secretkey = process.env.SECRET

exports.createToken = function (usuario){
    let payload = {
        sub : usuario._id,
        idenuser : usuario.DatosUser.IdenUser,
        nombuser : usuario.DatosUser.NombUser,
        apeluser : usuario.DatosUser.ApelUser,
        emaiuser : usuario.DatosUser.EmaiUser,
        proguser : usuario.DatosUser.proguser,
        estauser : usuario.EstaUser,
        // Fechas de creación y expiración del token:
        iat : momento().unix(),
        exp : momento().add(1, 'day').unix
    }
    // Codificamos el token:
    return jwt.encode(payload, secretkey)
}
// Devolver al control del login...