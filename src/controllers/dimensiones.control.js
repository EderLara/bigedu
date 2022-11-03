/** 
 * Aplicación BigEdu
 * @author:
 * @year  :
*/

'use strict';

// Modelo de datos:
const TipoUser = require('../models/tipouser.model');
const Programa = require('../models/programa.model');

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


function saveDocumento(req, res) {

}

function saveInstitucion(req, res) {
    
}

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
    deleteProgram

    
}