import dotenv from 'dotenv';
 dotenv.config();

 let productosDao
 let carritosDao

 //console.log("Nombre Base Datos env: "+process.env.nombreBD)

  switch (process.env.nombreBD) {
    case 'MongoDB':
      console.log("Se está usando MongoDB como Base de datos")
      console.log("-----------------------------------------")

      import("./productos/MongoDBProductos.js").then(({MongoDBProductos})=>{
        productosDao=new MongoDBProductos()
      })

      import("./carritos/MongoDBCarritos.js").then(({MongoDBCarritos})=>{
        carritosDao=new MongoDBCarritos()
      })

    break;

    case "FireBase":
        console.log("Se está usando fireBase como Base de datos")
        console.log("-----------------------------------------")

          import("./productos/FireBaseDBProductos.js").then(({FireBaseDBProductos})=>{
          productosDao=new FireBaseDBProductos()
        })
  
        import("./carritos/FireBaseDBCarritos.js").then(({FireBaseDBCarritos})=>{
          carritosDao=new FireBaseDBCarritos()
        })  

    break;

    default:
      console.log("Llegó al Default del switch, configuración Tipo de base de Datos"
      );
    break;
  }

  export {productosDao,carritosDao}