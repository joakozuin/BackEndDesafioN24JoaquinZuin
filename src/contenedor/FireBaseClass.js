import admin from 'firebase-admin';

import config from '../config.js'

admin.initializeApp({
  //credential:admin.credential.cert(serviceAccount)
  credential:admin.credential.cert(config.fireBase.options)
})

console.log('Conectado a la BD Firebase ');

class FireBaseClase {
  constructor(nombreColecc) {

    this.db=admin.firestore();
    this.coleccion=this.db.collection(nombreColecc);
    this.FieldValue= admin.firestore.FieldValue
  }

  async findAll(){
    try {
       
        const todos = await this.coleccion.get();
        return todos.docs.map(doc => doc.data());

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async findById(id){
    try {
       
        const uno = await this.coleccion.doc(id).get();
        return uno.data();

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async create(obj){
    try {
        
      //const uno=await this.coleccion.create(obj)
      //const uno=await this.coleccion.add(obj)
      const nuevoDoc=this.coleccion.doc();
      const id=nuevoDoc.id
      const uno=await nuevoDoc.set(obj)

      return id
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async editById(id,obj){
    try {
     
       const modifDoc = await this.coleccion.doc(id).update(obj);
       return modifDoc;

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async editByIdCarPostProd(id,obj){  //edita un carrito e inserta productos al carrito
    try {
      
       const modifProdCarr=await this.coleccion.doc(id).update({productos:this.FieldValue.arrayUnion(obj)})

       return modifProdCarr

    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async deleteById(id){
    try {

      const eliminadoDoc = await this.collection.doc(id).delete();
      return eliminadoDoc;
        
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

  async deleteByIdCarIdProd(id,obj){ //edita un carrito y borra productos
    try {

      const borraProdCarr=await this.coleccion.doc(id).update({productos:this.FieldValue.arrayRemove(obj)})

      return borraProdCarr
        
    } catch (error) {
        throw new Error('Mensaje de Error:',error)
    }
  }

}



export default FireBaseClase