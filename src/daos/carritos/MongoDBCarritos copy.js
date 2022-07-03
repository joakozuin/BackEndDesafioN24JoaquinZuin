import MongoClass from '../../contenedor/MongoClass.js'

export class MongoDBCarritos extends MongoClass{

  constructor(){
      //nombre de la coleccion y el esquema
      //
      super('carritos',{
        fecha: {type:String, required:true},
        productos: [{
          fecha: {type:String, required:true},
          nombre:{type:String,required:true},
          descripcion:{type:String,required:true},
          codigo:{type:Number,required:true},
          urlFoto:{type:String,required:true},
          precio:{type:Number,required:true},
          stock:{type:Number,Default:0}
        }]
      })
  }

/* 
  productos : [{
    fecha: {type:String, required:true},
    nombre:{type:String,required:true},
    descripcion:{type:String,required:true},
    codigo:{type:Number,required:true},
    urlFoto:{type:String,required:true},
    precio:{type:Number,required:true},
    stock:{type:Number,Default:0}
  }]

  productos : { type : Array , "default" : [] }
 */

}