
/* import  Api from '../modelo/apiClass.js';

const api=new Api('/dataBase/carrito.json');
const apiP=new Api('/dataBase/productos.json'); */

import {carritosDao as api}   from "../daos/index.js";
import {productosDao as apiP}   from "../daos/index.js";
import {funcUtil} from '../util/util.js'
const{calcFechaHora}=funcUtil
//Arreglo para persistencia de datos
//
/* let carrito=[
  {
      "id":1,
      "fecha":"20/5/2022",
      "productos":[
                {
                "id":1,
                "fecha":"20/10/2022",
                "nombre":"Escuadra",
                "descripcion":"Artículo de libreria",
                "codigo":1000,
                "urlFoto":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
                "precio":20000,
                "cantidad":2
                },
                {
                "id":1,
                "fecha":"20/10/2022",
                "nombre":"Escuadra",
                "descripcion":"Artículo de libreria",
                "codigo":1000,
                "urlFoto":"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
                "precio":20000,
                "cantidad":3
                }
              ]
    },
]
 */

//console.log(`Tamaño del arreglo:${ultId}`)
//console.log(`Tamaño de la funcion arreglo:${product().length}`)


  export const funcCarrito= {
  //Envia todos los carritos
  //
  getCarritos: async (req, res) => {

    try {
      let carritos = await api.findAll();

      res.json({
        mensage: "Lista de carritos de la BD",
        carritos,
        usuario: acceso,
      });
    } catch (error) {
      const error1 = new Error(
        `(getAll)-No se encuentran los carritos error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }


  },

  //Envia un carrito por id
  //
  getCarrito: async (req, res, next) => {
   
    try {
      const { id } = req.params;
   
      let carrit= await api.findById(id)
     

      res.json({
        mensage: `Carrito con id:${carrit[0]._id}`,
        carrito:carrit,
        usuario: acceso
      });

    } catch (error) {
      const error1 = new Error(`(get)-No se encuentra el carrito con el id: ${id}`);
      error.httpStatusCode = 400;

      return next(error1);  
    }
  },

  //Envia todos los productos de un carrito
  //
   getProdsCarrito: async (req, res,next) => {

    try {
      const { id } = req.params;
   
       let carrit= await api.findById(id)

       res.json({
        mensage: `Productos del Carrito con id:${carrit[0]._id}`,
        carrito:carrit[0].productos,
      });

    } catch (error) {

       const error1 = new Error(`(get)-No se encuentra el carrito con el id: ${id}`);
       error.httpStatusCode = 400;

       return next(error1);  
    }
  },

  //Agrega un carrito
  //
  postCarrito: async (req, res,next) => {
    /* const { fecha, nombre, descripcion,codigo,
            urlFoto,precio,stock } = req.body; */
   try {
     let producto = [];

     let carrito = {
       fecha: calcFechaHora(),
       productos: producto,
     };
     let carritId = await api.create(carrito);

     res.json({
       mensage: `Se agregó el carrito con id:${carritId}`,
       producto,
     });
   } catch (error) {
    const error1 = new Error(
      `(post)-No se pudo agregar un carrito error: ${error}`
    );
    error.httpStatusCode = 400;

    return next(error1);

   }
  },

  //Agrega productos a un carrito
  //
  postProdCarrito: async (req, res,next) => {

    try {
    const { id,id_prod } = req.params;

    //Hay q ver la cantidad de productos a agregar
    //solo agrega uno por vez
    let cantidad=2

    let prod= await apiP.findById(id_prod)
   
    let producto={...prod[0]._doc,cantidad:cantidad}

    let carr=await api.editByIdCarPostProd(id,producto)

    res.json({
      mensage: `Se agregó el producto con id: ${id_prod}, al carrito con id:${id}`,
      producto,
    });

    } catch (error) {
      const error1 = new Error(`(post)-No se pudo poner un producto el carrito con el id: ${error}`);
      error.httpStatusCode = 400;
      return next(error1);
    }
  },

  //Modifica un producto del carrito
  //
  putProducto: async (req, res,next) => {
    const { id } = req.params;
    const { fecha, nombre, descripcion,codigo,
      urlFoto,precio,stock } = req.body;

      let producto = {
        fecha,
        nombre,
        descripcion,
        codigo,
        urlFoto,
        precio,
        stock
  };

    let idError= await api.editById(id,producto)

    if (!idError) {
      const error = new Error(`(put)-No se encuentra el producto con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error);
    }

    res.json({
      mensage: `Se modificó el producto con id:${id}`,
      producto
    });



  },

  //Borra un carrito
  //
  deleteCarrito: async(req, res,next) => {
    
    try {

       const { id } = req.params;
       let idError= await api.deleteById(id)

       res.json({
        mensage: `Se borró el carrito con id:${id}`,
      });

    } catch (error) {
      const error1 = new Error(`(delete)-No se encuentra el carrito con el id: ${id}`);
      error.httpStatusCode = 400;
      return next(error1);
    }
  },

  //Borra productos de un carrito
  //
  deleteProdCarrito: async (req, res,next) => {

    try {
      const { id, id_prod } = req.params;

      let producto= await apiP.findById(id_prod)
      //let producto={...prod,id:id_prod}
      
      let carrito = await api.deleteByIdCarIdProd(id, id_prod);

      res.json({
        mensage: `Se borró el producto id:${id_prod} del carrito con id:${id}`,
        producto,
      });
    } catch (error) {
      const error1 = new Error(
        `(delete)-No se encuentra el carrito con el id: ${id}`
      );
      error.httpStatusCode = 400;
      return next(error1);
    }

  },
   


};