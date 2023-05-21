/**
 * Aplicación BigEdu
 * @author:
 * @year  :
 */

"use strict";

// Modelo de datos:
const User = require("../models/user.model");

// Constantes y librerias
const bcrypt = require("bcrypt-nodejs");
const mongoosePaginate = require("mongoose-pagination");
const path = require("path");
const fs = require("fs");
const { mensajes } = require("../util/estados");
const momento = require("moment");

// Servicio de autenticación:
const jwt = require("../services/jwt");
const { log } = require("console");
// const { async } = require('rxjs');

/* ---------------------------------------------------- TEST ---------------------------------------------------- */
function testControlUser(req, res) {
  console.log(req.body);
  res.status(200).send({
    ahora: momento().format("LTS"), // tambien podemos usar YYYY-MM-DD HH:MM:SS
    mensajes: mensajes,
  });
}

/* ---------------------------------------------------- CRUD ---------------------------------------------------- */
function saveUser(req, res) {
  let params = req.body;
  let usuario = new User();

  // Validacion de campos obligatorios:
  if (
    params.nickname &&
    params.passuser &&
    params.tipouser &&
    params.idenuser
  ) {
    // Capturamos los datos del formulario:
    usuario.NickName = params.nickname;
    usuario.TipoUser = params.tipouser;
    usuario.DatosUser.IdenUser = params.idenuser;
    usuario.DatosUser.NombUser = params.nombuser;
    usuario.DatosUser.ApelUser = params.apeluser;
    usuario.DatosUser.EmaiUser = params.emaiuser;
    usuario.DatosUser.TeleUser = params.teleuser;
    usuario.DatosUser.ProfUser = params.profuser;

    // Validamos duplicidad de usuario:
    User.find({
      $or: [
        { NickName: usuario.NickName },
        { DatosUser: { EmaiUser: usuario.DatosUser.EmaiUser } },
        { DatosUser: { IdenUser: usuario.DatosUser.IdenUser } },
      ],
    }).exec((err, users) => {
      if (err) throw err;
      // if (err) return res.status(500).send({ mensaje: mensajes.m500 });
      if (users && users.length >= 1) {
        return res.status(200).send({
          mensaje: "El usuario que intenta agregar ya existe",
        });
      } else {
        // Encriptamos la contraseña, y procedemos a guardar
        bcrypt.hash(params.passuser, null, null, (err, hash) => {
          usuario.PassUser = hash;
          // Asignamos a el ultimo campo:
          usuario.EstaUser = "Activo";

          usuario.save((err, nuevoUser) => {
            if (err) throw err;
            //if (err) return res.status(500).send({ mensaje: mensajes.m500 })
            if (nuevoUser) {
              return res.status(200).send({ usuario: nuevoUser });
            } else {
              return res
                .status(404)
                .send({ mensaje: "No se ha registrado el usuario" });
            }
          });
        });
      }
    });
  } else {
    res.status(200).send({ mensaje: mensajes.m000 });
  }
}

//Funcion Activar e inactivar usuario:
function delUser(req, res) {
  let user = req.params.idusuario;
  let usuario = new User();

  usuario.EstaUser = "Inactivo";

  // Query para buscar y actualizar:
  //por aitageo: 'le pase la propiedad Estauser para cambiar el estado reasignandola'
  User.findByIdAndUpdate(
    user,
    { EstaUser: "Inactivo" },
    { new: true },
    (err, userUpdated) => {
      if (err) throw err;
      console.error(err);
      if (!userUpdated) return res.status(404).send({ mensaje: mensajes.m404 });

      // Si todo sale bien:
      return res.status(200).send({ userUpdated }); //devuelvo solo el objeto
    }
  ); //no modifica en el documento en mongodb: tipo de usuario
}

// Funcion buscar Usuario:
function findUser(req, res) {
  let Idusuario = req.params.idusuario; //linea modificada por aitageo

  //13/11/2022/ linea 115 columna 30
  User.findById(Idusuario, { User }, { new: true }, (err, userFound) => {
    if (err) throw err;
    if (!userFound) return res.status(404).send({ mensaje: mensajes.m404 });
    return res.status(200).send({ usuario: userFound });
  });
}

// Listar todos los usuarios:
function listUsers(req, res) {
  // Traemos todos los usuarios de la base de datos:
  User.find((err, usuariosTodos) => {
    if (err) throw err;
    if (!usuariosTodos) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res.status(200).send({ usuarios: usuariosTodos });
  });
}

// Funcion AsignarRol:
function changeRol(req, res) {
  //cambiar tipo de usuario
  let usuario = new User();
  let usuarioid = req.params.idusuario;
  let params = req.body;
  usuario.NickName = params.nickname;
  let nickname = usuario.NickName;
  usuario.DatosUser.NombUser = params.nombuser;
  let nombre = usuario.DatosUser.NombUser;

  // Seguridad para no eliminar el campo password:
  // delete update.PassUser;

  // Query para buscar y actualizar:
  User.findByIdAndUpdate(
    usuarioid,
    { NickName: nickname, DatosUser: { NombUser: nombre } },
    { new: true },
    (err, userUpdated) => {
      if (err) throw err;
      if (!userUpdated) return res.status(404).send({ mensaje: mensajes.m404 });

      // Si todo sale bien:
      return res.status(200).send({ Usuario: userUpdated });
    }
  );
}

// Función para login:
function loginUser(req, res) {
  let params = req.body;
  let nickname = params.nickname;
  let passuser = params.passuser;
  console.log(params);

  // Query para login:
  User.findOne({ NickName: nickname }, (err, user) => {
    console.log(user);
    if (err) throw err;
    if (user) {
      // Encripto el pass del formulario:
      bcrypt.compare(passuser, user.PassUser, (err, ok) => {
        //console.log(ok);
        if (err) throw err;

        if (ok) {
          // Validación de parametro token:
          if (params.getToken) {
            return res.status(200).send({user:user,token: jwt.createToken(user)
            });
          }  return res.status(200).send({});
        }
      });
    } else {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
  });
}

function UploadImage(req, res) {
  let UserId = req.params.id;
  let fileName = "No se ha cargado la imagen";

  if (req.files) {
    let filePath = req.files.image.path
    console.log(filePath);
    let fileSplit = filePath.split("\\");
    console.log(fileSplit);
    fileName = fileSplit[4];
    console.log(fileName);
    let extSplit = fileName.split(".");
    let fileExt = extSplit[1];

    if (fs.existsSync("src/assets/img/")) {
      if (
        fileExt == "PNG" ||
        fileExt == "png" ||
        fileExt == "jpg" ||
        fileExt == "jpeg" ||
        fileExt == "gif"
      ) {
        User.findByIdAndUpdate(
          UserId,
          { image: fileName  },
          { new: true },
          (err, userUpdated) => {
            if (err) return res.status(500).send({ mensaje: mensajes.m402 });

            if (!userUpdated)
              return res.status(404).send({ mensaje: mensajes.m404 });

            return res.status(200).send({
              user: userUpdated,
            });
          }
        );
      } else {
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          return res.status(200).send({ mensaje: mensajes.m502 });
        });
      }
    } else {
      return res.status(200).send({
        message: {message: "Imagen cargada",fileName,filePath},
      });
    }
  }
}



function ShowImages(req, res) {
  // const type = req.params.type;
  const image = req.params.image;
   const pathImage  = path.resolve(__dirname,`../assets/documentos/img/${image}`);
   console.log(pathImage);
  
  // Verificar si el archivo existe y enviarlo como respuesta
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  } else {
    const pathNoImage = path.resolve(__dirname,'../assets/documentos/img/no-image.png');
    res.sendFile(pathNoImage);
    res.status(404);
  }
}




module.exports = {
  testControlUser,
  saveUser,         // RF1
  delUser,          // RF3
  findUser,         // RF4
  listUsers,        // RF4
  loginUser,        // RF5
  changeRol,        // RF6
  UploadImage,      // RF7
  ShowImages        // RF8
};
