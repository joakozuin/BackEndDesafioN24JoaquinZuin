import MongoClass from '../../contenedor/MongoClass.js'
import { carritosEsquema } from "../../modelo/CarritosEsquema.js"
export class MongoDBCarritos extends MongoClass{

  constructor(){
      //nombre de la coleccion y el esquema
      //
      super('carritos',carritosEsquema)
  }


}