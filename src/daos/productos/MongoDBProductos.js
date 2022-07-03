import MongoClass from '../../contenedor/MongoClass.js'
import { productosEsquema } from "../../modelo/ProductosEsquema.js"

export class MongoDBProductos extends MongoClass{

  constructor(){
      //nombre de la coleccion y el esquema
      //
      super('productos',productosEsquema)
  }

}