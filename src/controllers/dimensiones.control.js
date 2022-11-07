/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

// Modelo de datos:
const TipoUser = require('../models/tipouser.model');
const Programa = require('../models/programa.model');
const Documento = require('../models/documentos.model');
const Institucion = require('../models/institucion.model');

const { mensajes } = require('../util/estados');
const momento = require('moment');
const { exists } = require('../models/tipouser.model');


/* ---------------------------------------------------- CRUD TipoUser ---------------------------------------------------- */
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



function getTipoUser(req,res){
    let TipoUserId = req.params.id;
    let tipouserUp = new TipoUser();
    tipouserUp.nombre_tipoUsuario = req.body;

    TipoUser.findById(TipoUserId,tipouserUp.nombre_tipoUsuario,{new :true},((err,TipoUserFound)=>{
        if(err) throw err;
        if(!TipoUserFound) return res.status(404).send({mensaje: mensajes.m404});
        return res.status(200).send({TipoUserFound});
    }))

}


function updateTipoUser(req,res){
    let TipoUserId = req.params.id;
    let params = req.body;
    let nombre_tipoUsuario = params.nombre_tipoUsuario;

    TipoUser.findByIdAndUpdate(TipoUserId,{nombre_tipoUsuario: nombre_tipoUsuario},{new: true},((err,TipoUserUpdated)=>{
        if(err) throw err;
        if(!TipoUserUpdated) return res.status(404).send({mensaje: mensajes.m404});
        return res.status(200).send({nombre_tipoUsuario:TipoUserUpdated});

    }))
}



function deleteTipoUser(req,res){
  let TipoUserId = req.params.id;
 
  TipoUser.findByIdAndDelete(TipoUserId,{new: true},(error,TipoUserDelete)=>{
          if(error) throw err;
          if(!TipoUserDelete) return res.status(404).send({mensaje: mensajes.m404});
          return res.status(200).send({mensaje: mensajes.m200,TipoUser:TipoUserDelete});
  })


}
/* ---------------------------------------------------- Fin Crud Tipo User ---------------------------------------------------- */



/* ---------------------------------------------------- Inicio CRUD  Programa---------------------------------------------------- */

function savePrograma(req, res) {//tiene un error en la validacion
  let params = req.body;
  let programa = new Programa();

  Programa.findOne({
    nombre_programa: params.nombre_programa
  }).exec((err, data) => {
    if (err) return res.status(500).send({ mensaje: mensajes.m500 });
    if (!data || data.nombre_programa != params.nombre_programa 
    ) {
      if (params.nombre_programa || params.descripcion_programa) {
        programa.nombre_programa = params.nombre_programa;
        programa.descripcion_programa = params.descripcion_programa;

        programa.save((err, programaStored) => {
          if (err) throw err;
          if (programaStored) {
            return res.status(200).send({ programa: programaStored });
          }
        });
      } else {
        return res.status(404).send({ mensaje: mensajes.m000 });
      }
    }
  });
}


function listProgramas(req,res){
  Programa.find((err,TodosProgramas)=>{
    if (err) throw err;
    if (!TodosProgramas){
        return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res.status(200).send({mensaje: mensajes.m200,programas: TodosProgramas });
  })
}


function getPrograma(req,res){
  let programId = req.params.id;
  
  Programa.findById(programId,(error,programFound)=>{
    if (error) throw error;
    if (!programFound){
        return res.status(404).send({ mensaje: mensajes.m404 });
    }
    return res.status(200).send({mensaje: mensajes.m200, programFound });

  })


}

function UpdateProgram(req,res){
  let ProgramId = req.params.id;
  let params = req.body;
  let nombre_program = params.nombre_programa;
  let descripcion_programa = params.descripcion_programa;
  let data = {};
  data = {
    nombre_program,
    descripcion_programa
  }

  Programa.findByIdAndUpdate(ProgramId,data,{new:true},(error,ProgramUpdate)=>{
    if (error) throw error;
    if(!ProgramUpdate){
      return res.status(404).send({mensaje:mensajes.m404});
    } 
     return res.status(200).send({mensaje:mensajes.m200,ProgramUpdate});

  })

}

//no se si dejarlo que borre fisico o ponerle un inactivo
  function deleteProgram(req,res){
  let ProgramId = req.params.id;

  Programa.findByIdAndRemove(ProgramId,(error,ProgramDelete)=>{
    if (error) throw error;
    if(!ProgramDelete){
      return res.status(404).send({mensaje:mensajes.m404});
  }

  return res.status(200).send({mensaje:mensajes.m200,ProgramDelete})

})
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
      formato_documento
    }

    //validacion para saber si existe el documento
    Documento.findOne({nombre_documento:params.nombre_documento})
    .exec((error,document)=>{
      if (error) return res.status(500).send({ mensaje: mensajes.m500 });
       if(!document || document.nombre_documento != params.nombre_documento);{
        
        // campos obligatorios:
        if (params.nombre_documento) {
          documento.nombre_documento = params.nombre_documento;
          documento.descripcion_documento = params.descripcion_documento;
          documento.formato_documento = params.formato_documento;
          
          //le paso los otros campos en data
          documento.save(data,(error,DocumentStored)=>{
            if(error) throw error;
            if (DocumentStored) {
              return res.status(200).send({ DocumentStored });
          }


          })

        }
        else {
          return res.status(200).send({ mensaje: mensajes.m409 });
        }
      }
    });
    
  }


   function getListDocument(req,res){
      Documento.find((err,TodosDocuments)=>{
        if(err) throw err;
        if(!TodosDocuments){
          return res.status(404).send({mensaje:mensajes.m404});
        }
          return res.status(200).send({mensaje:mensajes.m200,TodosDocuments});
      })
   }


  function getDocumento(req,res){
    let DocumentId = req.params.id;

    Documento.findById(DocumentId,(error,DocumentFound)=>{
      if(error) throw error;
      if (!DocumentFound){
          return res.status(404).send({ mensaje: mensajes.m404 });
      }
      return res.status(200).send({mensaje:mensajes.m200,DocumentFound});

    })
  }


  function UpdateDocument(req,res){
   let DocumentId  = req.params.id;
   let params = req.body;
   let nombre_documento = params.nombre_documento;
   let descripcion_documento = params.descripcion_documento;
   let formato_documento = params.formato_documento;
   let data = {};
   data = {nombre_documento,descripcion_documento,formato_documento}

   Documento.findByIdAndUpdate(DocumentId,data,{new:true},(err,DocumentUpdate)=>{
    if(err) throw err;
    if(!DocumentUpdate){
        return res.status(404).send({mensaje:mensajes.m404});
    }
        return res.status(200).send({mensaje:mensajes.m200,DocumentUpdate});

   });

  }



  function DeleteDocument(req,res){
    let DocumentId = req.params.id;
    let document = new Documento();

    document.Estado = "Inactivo";

    Documento.findByIdAndUpdate(DocumentId,{Estado : 'Inactivo'},{new:true},(err,DocumentDelete)=>{
      if (err) throw err;
      if (!DocumentDelete) {
        return res.status(404).send({ mensaje: mensajes.m404 });
      }
        return res.status(200).send({DocumentDelete:DocumentDelete});
    })
         
  }


    
  













/* ---------------------------------------------------- Fin CRUD  Documento---------------------------------------------------- */


/* ---------------------------------------------------- Inicio CRUD Institucion---------------------------------------------------- */
//valida, falta nombre_rector y coordinador
function saveInstitucion(req, res) {
  let institucion = new Institucion;
  let params = req.body;
  let nombre_institucion = params.nombre_institucion;
  let ubicacion_geografica = {};
  let lat = params.lat;
  let lng = params.lng;
  ubicacion_geografica = {lat,lng};
  let telefono_ie = params.telefono_ie;
  let nombre_rector = params.nombre_rector;
  let nombre_coordinador = params.nombre_coordinador;
  let data = {};
  data = {nombre_institucion,telefono_ie,nombre_rector,nombre_coordinador}

  Institucion.findOne({nombre_institucion:params.nombre_institucion})
  .exec((error,data)=>{
    if (error) return res.status(500).send({ mensaje: mensajes.m500 });
    if(data){
      return res.status(200).send({mensaje:mensajes.m409});
    }else {
      if(params.nombre_institucion){
       institucion.nombre_institucion = params.nombre_institucion;
       institucion.ubicacion_geografica = ubicacion_geografica;
       institucion.nombre_rector = params.nombre_rector;//no lee linea 291 y 292
       institucion.nombre_coordinador = params.nombre_coordinador;
       institucion.telefono_ie = params.telefono_ie;


       institucion.save((err,InstitucionStored)=>{
        if (err) throw err;
        if (InstitucionStored) {
            return res.status(200).send({ institucion: InstitucionStored });
          }else {
            return res.status(404).send({ mensaje: mensajes.m000 });
          }

       });
      }

      }

    });


  }

/* ---------------------------------------------------- Fin CRUD Institucion---------------------------------------------------- */  

function savePeriodo(req, res) {
    
}

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
    saveInstitucion

    
}