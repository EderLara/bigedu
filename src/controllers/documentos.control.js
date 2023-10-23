/**
 * Aplicación BigEdu
 * @author:aitageo
 * @year  :
 */

"use strict";

const { mensajes } = require("../util/estados");
const momento = require("moment");
const multer = require('multer');

//objeto que usa multer para saber donde y como se llama el archivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/assets/documentos/formatos'); // Directorio donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.single('myFile');//para cargar un archivo
//funcion que controla la carga del archivo
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se ha proporcionado un archivo" });
  }

  const file = req.file;
  return res.status(200).json({ message: "Archivo cargado con éxito", file: file });
};

    





/* -------------------------------------------------------------------------------------------------------- */

