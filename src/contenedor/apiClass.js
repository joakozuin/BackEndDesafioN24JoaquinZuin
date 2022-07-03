
//const fs=require('fs')
import fs from 'fs'

class Api {

    constructor(rutaBD) {
        //this.rutaBD=__dirname+rutaBD
        this.rutaBD=(process.cwd() +rutaBD)
        //console.log(`Ruta base datos Api: ${this.rutaBD}`)
    }

    //Busca todos los objetos en la BD
    //
    async findAll(){
        try{
          const todos=await  fs.promises.readFile(this.rutaBD,'utf-8')
          return JSON.parse(todos)
        }catch(error){
            throw new Error(`Error leyendo toda la BD:${error}`)
        }
    }

    //Busca un obj por id en la BD
    //
     async findById(id){
       try{
          const todos= await this.findAll()
          let resultad={}

          const result=todos.find(e=>e.id===Number(id))

          if(result){         
            resultad={
                resultado:result,
                idError:true
                    }
           }else{
            resultad={
                resultado:result,
                idError:false
              }
          }
                                                  
          return resultad

       }catch(error){
         throw new Error(`Error leyendo un registro de la BD:${error}`)
       }
     }
     
     //Crea un objeto en la BD
     //
     async create(obj){
       try{

         const todos= await this.findAll()

         let id

         todos.length===0
         ?id=1
         :id=todos[todos.length-1].id+1 //calcula el id

         todos.push({...obj,id}) //agrega el objeto al arreglo con el id calculado
        
         await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
         
         return id

       }catch(error){
          throw new Error(`Error al guardar un registro en la BD:${error}`)
       }

     }

      async editById(id,obj){
        try{

            const todos= await this.findAll()

            let idError=false

            todos.forEach((todo , i )=>{

             if ( todo.id === Number(id)){
                 todos[i]={...obj,id}
                 idError=true
             }  

           });

           if(idError){
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return idError
           }else{
            return idError
           } 

        }catch(error){
            throw new Error(`Error al modificar un registro en la BD:${error}`)
        }

      }

      async editByIdCar(id,obj){
        try{

            const todos= await this.findAll()

            let idError=false

            todos.forEach((todo , i )=>{

             if ( todo.id === Number(id)){
                 todos[i].productos.push(obj)
                 idError=true
             }  

           });

           if(idError){
            await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
            return idError
           }else{
            return idError
           } 

        }catch(error){
            throw new Error(`Error al modificar un registro en la BD:${error}`)
        }

      }

      async deleteById(id){
        try{
            const todos= await this.findAll()
            let idError=false

            todos.forEach((todo , i )=>{

              if ( todo.id === Number(id)){
                 todos.splice(i,1)
                 idError=true
              }  
   
            });

            if(idError){
                await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
                return idError
            }else{
                return idError
            }

        }catch(error){
            throw new Error(`Error al borrar un registro en la BD:${error}`)
        }
      }

      async deleteByIdCarIdProd(id,id_prod){
        try{
            const todos= await this.findAll()
            let idError=false

            todos.forEach((todo , i )=>{

              if ( todo.id === Number(id)){

                 todo.productos.forEach((prod,j)=>{

                    if(prod.id===Number(id_prod)){

                      todos[i].productos.splice(j,1)
                   
                    }

                 })

                 idError=true
              }  
   
            });

            if(idError){
                await fs.promises.writeFile(this.rutaBD,JSON.stringify(todos))
                return idError
            }else{
                return idError
            }

        }catch(error){
            throw new Error(`Error al borrar un registro en la BD:${error}`)
        }
      }

}

//module.exports=Api
export default Api