import mongoose from 'mongoose';
import config from '../config.js'

mongoose.connect(config.mongoDB.URL,config.mongoDB.options)

class MongoClase {
  constructor(nombreColecc, esqDoc) {

    this.coleccion=mongoose.model(nombreColecc,esqDoc)

  }

  async findAll(){
    try {
        const todos=await this.coleccion.find({})
        return todos
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async findById(id){
    try {
        const uno=await this.coleccion.find({_id:id})
        return uno
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async create(obj){

    try {
        const uno=await this.coleccion.create(obj)
        return uno
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async editById(id,obj){
    try {
    
       const uno=await this.coleccion.updateOne({_id:id},{$set:obj})
       return uno

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async editByIdCarPostProd(id,obj){  //edita un carrito e inserta productos al carrito
    try {
      
       let carrito= await this.coleccion.findById({_id:id})

      const productoEnCarrito = carrito.productos.find(p => JSON.stringify(p._id) == JSON.stringify(obj._id));

      if (productoEnCarrito) {
          productoEnCarrito.cantidad= productoEnCarrito.cantidad+obj.cantidad;
      }else { 
        carrito.productos.push(obj);
      }

      const carritoModif = await this.coleccion.findByIdAndUpdate(carrito._id, {productos: carrito.productos});

      return carritoModif;

        //const carritoModif1=await this.coleccion.updateOne({_id:id},{$push:{productos:obj}})
        //return carritoModif1


    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async deleteById(id){
    try {
    
        const uno=await this.coleccion.deleteOne({_id:id})
        return uno
        
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async deleteByIdCarIdProd(id,id_prod){ //edita un carrito y borra productos
    try {  
      let carrito= await this.coleccion.findById({_id:id})
      const productoEnCarrito = carrito.productos.find(p =>p._id == id_prod);
      if (productoEnCarrito) {
        if(productoEnCarrito.cantidad >1){
          productoEnCarrito.cantidad=productoEnCarrito.cantidad-1
         }else{
          carrito.productos = carrito.productos.filter(p => p._id != id_prod)
         }
      }else{
          throw new Error("El producto no esta en el carrito");
      }

      const carritoModif = await this.coleccion.findByIdAndUpdate(carrito._id, {productos: carrito.productos});
      return carritoModif;

        /* const uno=await this.coleccion.updateOne({_id:id},{$pull:{productos:{_id:id_prod}}})
        return uno */

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }  }

}



export default MongoClase