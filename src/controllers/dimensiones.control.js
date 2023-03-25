/**
 * Aplicación BigEdu
 * @author:
 * @year  :
 */

"use strict";

// Modelo de datos:
const TipoUser = require("../models/tipouser.model");
const Programa = require("../models/programa.model");
const Documento = require("../models/documentos.model");
const Institucion = require("../models/institucion.model");
const Periodo = require("../models/periodo.model");
const { mensajes } = require("../util/estados");
const momento = require("moment");
const { exists } = require("../models/tipouser.model");

/* ---------------------------------------------------- CRUD TipoUser ---------------------------------------------------- */
function saveTipoUser(req, res) {
  let params = req.body;
  let tipouser = new TipoUser();

  TipoUser.findOne({ nombre_tipoUsuario: params.nombre_tipouser }).exec(
    (err, data) => {
      if (err) return res.status(500).send({ mensaje: mensajes.m500 });
      /*por aitageo */ if (data) {
        return res.status(200).send({ mensaje: mensajes.m409 });
      } else {
        // campos obligatorios:
        if (params.nombre_tipouser) {
          tipouser.nombre_tipoUsuario = params.nombre_tipouser;

          tipouser.save((err, tipoStored) => {
            if (err) throw err;
            if (tipoStored) {
              return res.status(200).send({ tipo_user: tipoStored });
            }
          });
        }
      }
    }
  );
}

function getTipoUser(req, res) {
  let TipoUserId = req.params.id;
  let tipouserUp = new TipoUser();
  tipouserUp.nombre_tipoUsuario = req.body;

  TipoUser.findById(
    TipoUserId,
    tipouserUp.nombre_tipoUsuario,
    { new: true },
    (err, TipoUserFound) => {
      if (err) throw err;
      if (!TipoUserFound)
        return res.status(404).send({ mensaje: mensajes.m404 });
      return res.status(200).send({ TipoUserFound });
    }
  );
}

function updateTipoUser(req, res) {
  let TipoUserId = req.params.id;
  let params = req.body;
  let nombre_tipoUsuario = params.nombre_tipoUsuario;

  TipoUser.findByIdAndUpdate(
    TipoUserId,
    { nombre_tipoUsuario: nombre_tipoUsuario },
    { new: true },
    (err, TipoUserUpdated) => {
      if (err) throw err;
      if (!TipoUserUpdated)
        return res.status(404).send({ mensaje: mensajes.m404 });
      return res.status(200).send({ nombre_tipoUsuario: TipoUserUpdated });
    }
  );
}

function deleteTipoUser(req, res) {
  let TipoUserId = req.params.id;

  TipoUser.findByIdAndDelete(
    TipoUserId,
    { new: true },
    (error, TipoUserDelete) => {
      if (error) throw err;
      if (!TipoUserDelete)
        return res.status(404).send({ mensaje: mensajes.m404 });
      return res
        .status(200)
        .send({ mensaje: mensajes.m200, TipoUser: TipoUserDelete });
    }
  );
}
/* ---------------------------------------------------- Fin Crud Tipo User ---------------------------------------------------- */

/* ---------------------------------------------------- Inicio CRUD  Programa---------------------------------------------------- */

function savePrograma(req, res) {
  //tiene un error en la validacion
  let params = req.body;
  let programa = new Programa();

  Programa.findOne({
    nombre_programa: params.nombre_programa,
  }).exec((err, data) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (data) {
      return res.status(200).send({ mensaje: mensajes.m409 });
    } else {
      if (params.nombre_programa) {
        programa.nombre_programa = params.nombre_programa;
        programa.descripcion_programa = params.descripcion_programa;

        programa.save((err, programaStored) => {
          if (err) throw err;
          if (programaStored) {
            return res.status(200).send({ programa: programaStored });
          }
        });
      }
    }
  });
}

function listProgramas(req, res) {
  Programa.find((err, TodosProgramas) => {
    if (err) throw err;
    if (!TodosProgramas) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, programas: TodosProgramas });
  });
}

function getPrograma(req, res) {
  let programId = req.params.id;

  Programa.findById(programId, (error, programFound) => {
    if (error) throw error;
    if (!programFound) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res.status(200).send({ mensaje: mensajes.m200, programFound });
  });
}

function UpdateProgram(req, res) {
  let ProgramId = req.params.id;
  let programa = req.body;

  Programa.findByIdAndUpdate(
    ProgramId,
    programa,
    { new: true },
    (error, ProgramUpdate) => {
      if (error) throw error;
      if (!ProgramUpdate) {
        return res.status(404).send({ mensaje: mensajes.m404 });
      }
      return res.status(200).send({ mensaje: mensajes.m200, ProgramUpdate });
    }
  );
}

//no se si dejarlo que borre fisico o ponerle un inactivo
function deleteProgram(req, res) {
  let ProgramId = req.params.id;

  Programa.findByIdAndRemove(ProgramId, (error, ProgramDelete) => {
    if (error) throw error;
    if (!ProgramDelete) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }

    return res.status(200).send({ mensaje: mensajes.m200, ProgramDelete });
  });
}

/* ---------------------------------------------------- Fin CRUD  Programa---------------------------------------------------- */

/* ---------------------------------------------------- Inicio CRUD  Documento---------------------------------------------------- */

function saveDocumento(req, res) {
  let documento = new Documento();
  let params = req.body;
  let nombre_documento = params.nombre_documento;
  let descripcion_documento = params.descripcion_documento;
  let formato_documento = params.formato_documento;
  let data = {};
  data = {
    nombre_documento,
    descripcion_documento,
    formato_documento,
  };

  //validacion para saber si existe el documento
  Documento.findOne({ nombre_documento: params.nombre_documento }).exec(
    (error, document) => {
      if (error) return res.status(500).send({ mensaje: mensajes.m500 });
      if (document) {
        return res.status(200).send({ mensaje: mensajes.m409 });
      } else {
        // campos obligatorios:
        if (params.nombre_documento) {
          documento.nombre_documento = nombre_documento;
          documento.descripcion_documento = descripcion_documento;
          documento.formato_documento = formato_documento;

          //le paso los otros campos en data
          documento.save(data, (error, DocumentStored) => {
            if (error) throw error;
            if (DocumentStored) {
              return res.status(200).send({ DocumentStored });
            }
          });
        }
      }
    }
  );
}

function getListDocument(req, res) {
  Documento.find((err, TodosDocuments) => {
    if (err) throw err;
    if (!TodosDocuments) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res.status(200).send({ mensaje: mensajes.m200, TodosDocuments });
  });
}

function getDocumento(req, res) {
  let DocumentId = req.params.id;

  Documento.findById(DocumentId, (error, DocumentFound) => {
    if (error) throw error;
    if (!DocumentFound) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res.status(200).send({ mensaje: mensajes.m200, DocumentFound });
  });
}

function UpdateDocument(req, res) {
  let DocumentId = req.params.id;
  let params = req.body;

  let nombre_documento = params.nombre_documento;
  let descripcion_documento = params.descripcion_documento;
  let formato_documento = params.formato_documento;
  let data = {};
  data = { nombre_documento, descripcion_documento, formato_documento };

  Documento.findByIdAndUpdate(
    DocumentId,
    data,
    { new: true },
    (err, DocumentUpdate) => {
      if (err) throw err;
      if (!DocumentUpdate) {
        return res.status(404).send({ mensaje: mensajes.m404 });
      }
      return res.status(200).send({ mensaje: mensajes.m200, DocumentUpdate });
    }
  );
}

function DeleteDocument(req, res) {
  let DocumentId = req.params.id;
  let document = new Documento();

  document.Estado = "Inactivo";

  Documento.findByIdAndUpdate(
    DocumentId,
    { Estado: "Inactivo" },
    { new: true },
    (err, DocumentDelete) => {
      if (err) throw err;
      if (!DocumentDelete) {
        return res.status(404).send({ mensaje: mensajes.m404 });
      }
      return res.status(200).send({ DocumentDelete: DocumentDelete });
    }
  );
}

/* ---------------------------------------------------- Fin CRUD  Documento---------------------------------------------------- */

/* ---------------------------------------------------- Inicio CRUD Institucion---------------------------------------------------- */
//valida, falta nombre_rector y coordinador
function saveInstitucion(req, res) {
  let institucion = new Institucion();
  let params = req.body;
  // Adiición de paramétros adicionales para configurar la ie: usar con front-end desde: https://github.com/marcovega/colombia-json, or https://www.datos.gov.co/resource/xdk5-pm3f.json, leer :https://dev.socrata.com/foundry/www.datos.gov.co/xdk5-pm3f
  let departamento = params.departamento;
  let municipio = params.municipio;

  let nombre_institucion = params.nombre_institucion;
  let ubicacion_geografica = {};
  let lat = params.lat;
  let lng = params.lng;
  ubicacion_geografica = { lat, lng };
  let telefono_ie = params.telefono_ie;
  let telefono_rector = params.telefono_rector;
  let telefono_coordinador = params.telefono_coordinador;
  let nombre_rector = params.nombre_rector;
  let nombre_coordinador = params.nombre_coordinador;
  // let data = {};
  // data = { nombre_institucion, telefono_ie, nombre_rector, nombre_coordinador };

  Institucion.findOne({ nombre_institucion: params.nombre_institucion }).exec(
    (error, data) => {
      if (error) return res.status(500).send({ mensaje: mensajes.m500 });
      if (data) {
        return res.status(200).send({ mensaje: mensajes.m409 });
      } else {
        if (params.nombre_institucion) {
          institucion.departamento = departamento;
          institucion.municipio = municipio;
          institucion.nombre_institucion = nombre_institucion;
          institucion.ubicacion_geografica = ubicacion_geografica;
          institucion.nombre_rector = nombre_rector;                     //no lee linea 291 y 292
          institucion.nombre_coordinador = nombre_coordinador;
          institucion.telefonos_ie.telefono_ie = telefono_ie;
          institucion.telefonos_ie.telefono_rector = telefono_rector;
          institucion.telefonos_ie.telefono_coordinador = telefono_coordinador;
          institucion.telefonos_ie.telefono_ie = telefono_ie;


          institucion.save((err, InstitucionStored) => {
            if (err) throw err;
            if (InstitucionStored) {
              return res.status(200).send({ institucion: InstitucionStored });
            } else {
              return res.status(404).send({ mensaje: mensajes.m000 });
            }
          });
        }
      }
    }
  );
}

function GetListInstitucions(req, res) {
  Institucion.find((err, TodasInstituciones) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (!TodasInstituciones) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, TodasInstituciones: TodasInstituciones });
  });
}

function GetInstitucion(req, res) {
  let InstitucionId = req.params.id;

  Institucion.findById(InstitucionId, (err, InstitucionFound) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (!InstitucionFound) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, InstitucionFound: InstitucionFound });
  });
}

function UpdateInstitucion(req, res) {
  let InstitucionId = req.params.id;
  let update = req.body;

  Institucion.findByIdAndUpdate(InstitucionId, update, (err, InstituUpdate) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (!InstituUpdate) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, InstituUpdate: InstituUpdate });
  });
}

function DeleteInstituto(req, res) {
  let InstitucionDelete = req.params.id;

  Institucion.findByIdAndDelete(InstitucionDelete, (err, InstitutoDelete) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (!InstitutoDelete) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, InstitutoDelete: InstitutoDelete });
  });
}

/* ---------------------------------------------------- Fin CRUD Institucion---------------------------------------------------- */

/* ---------------------------------------------------- Inicio CRUD Periodo---------------------------------------------------- */

// Guardar el periodo lectivo = año
function savePeriodo(req, res) {
  let periodo = new Periodo();
  let params = req.body;
  let año_lectivo = params.año_lectivo;
  let fecha_inicio = momento().format("LLL");
  let fecha_fin = params.fecha_fin;
  let fechas = {};
  fechas = { fecha_inicio, fecha_fin };

  Periodo.findOne({ año_lectivo: params.año_lectivo }).exec((err, data) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (data) {
      return res.status(200).send({ mensaje: mensajes.m409 });
    } else {
      if (params.año_lectivo) {
        periodo.año_lectivo = params.año_lectivo;
        periodo.año_lectivo = año_lectivo;
        periodo.fecha_inicio = fecha_inicio;
        periodo.fecha_fin = params.fecha_fin;

        periodo.save(fechas, (err, PeriodoStored) => {
          if (err) throw err;
          if (!PeriodoStored) {
            return res.status(200).send({ mensaje: mensajes.m409 });
          }
          return res
            .status(200)
            .send({ mensaje: mensajes.m200, PeriodoStored: PeriodoStored });
        });
      }
    }
  });
}

function getListPeriodos(req, res) {
  Periodo.find((err, TodosPeriodos) => {
    if (err) throw err;
    if (!TodosPeriodos) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, TodosPeriodos: TodosPeriodos });
  });
}

function GetPeriodo(req, res) {
  let periodoId = req.params.id;

  Periodo.findById(periodoId, (err, PeriodoFound) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (!PeriodoFound) {
      res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, PeriodoFound: PeriodoFound });
  });
}

function UpdatePeriodo(req, res) {
  let periodoId = req.params.id;
  let periodo = req.body;

  Periodo.findByIdAndUpdate(
    periodoId,
    periodo,
    { new: true },
    (err, PeriodoUpdated) => {
      if (err) return res.status(500).send({ mensaje: mensajes.m500 });
      if (!PeriodoUpdated) {
        res.status(404).send({ mensaje: mensajes.m404 });
      }
      return res
        .status(200)
        .send({ mensaje: mensajes.m200, PeriodoUpdated: PeriodoUpdated });
    }
  );
}

function DeletePeriodo(req, res) {
  let PeriodoId = req.params.id;

  Periodo.findByIdAndDelete(PeriodoId, (err, PeriodoDelete) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (!PeriodoDelete) {
      return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res
      .status(200)
      .send({ mensaje: mensajes.m200, PeriodoDelete: PeriodoDelete });
  });
}

/* ---------------------------------------------------- Fin CRUD Periodo---------------------------------------------------- */

module.exports = {
  saveTipoUser,
  getTipoUser,
  updateTipoUser,
  deleteTipoUser,
  savePrograma,
  listProgramas,
  getPrograma,
  UpdateProgram,
  deleteProgram,
  saveDocumento,
  getDocumento,
  getListDocument,
  UpdateDocument,
  DeleteDocument,
  saveInstitucion,
  GetListInstitucions,
  GetInstitucion,
  UpdateInstitucion,
  DeleteInstituto,
  savePeriodo,
  getListPeriodos,
  GetPeriodo,
  UpdatePeriodo,
  DeletePeriodo,
};
