/**
 * Archivo de utilidades del aplicativo. Diccionario con Mensajes de estado
 * @author: Johan Stived Osorio Velez
 */

 'use strict';

 module.exports = {

  mensajes: {
         m200: 'La petición se ha completado correctamente',
         m400: 'Error de Registro: Se deben llenar los campos obligatorios',
         m401: 'Petición Expirada!',
         m402: 'La imagen no pudo ser cargada',
         m403: 'La petición no se puede procesar, error de autenticación',
         m404: 'No se han encontrado resultados',
         m405: 'No se pudo seguir debido a errores de semántica',
         m408: 'Se ha agotado el tiempo de para ejecutar la acción',
         m409: 'Ya se encuentra registrado en la base de datos',
         m500: 'Ha ocurrido un error en la petición',
         m502: 'La extension no esta permitida',
         m000: 'Debes llenar los campos obligatorios'
     }
} 

/*

db.coleccion1.aggregate([
  {
    $lookup:
      {
        from: "coleccion2",
        localField: "_id",
        foreignField: "idColeccionUno",
        as: "datosRelacionados"
      }
  }
])

// Mucho mas elaborada:
db.tabla1.aggregate(
  [
    {
      $lookup: {
        from: "tabla2",
        localField: "_id",
        foreignField: "relacion_ ObjectId_1",
        as: "info_relacionada_tabla2"
      }
    },
   {
      $lookup: {
        from: "tabla3",
        localField: "_id",
        foreignField: "relacion_ ObjectId_2",
        as: "info_relacionada_tabla3"
      }
    },
    {
      $lookup: {
        from: "tabla4",
        localField: "_id",
        foreignField: "relacion_ ObjectId_3",
        as: "info_relacionada_tabla4"
      }
    },
     {
      $project: {
        campo1:1,
        campo2:1,
        campo3: 1,
        campo4:1,
        info_relacionada_tabla2:1,
        info_relacionada_tabla3:1,
        info_relacionada_tabla4:1
      }
    }
  ]
)
*/