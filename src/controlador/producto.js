/* import  Api from '../modelo/apiClass.js';
const api=new Api('/dataBase/productos.json'); */

import {productosDao as api}   from "../daos/index.js";
import {funcUtil} from '../util/util.js'
const{calcFechaHora}=funcUtil

//Arreglo para persistencia de datos
//
/* let productos=[
  {
    id:1,
    fecha:'20/10/2022'
    nombre:'Escuadra',
    descripcion:'Artículo de libreria',
    codigo:1000,
    urlFoto:"https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
    precio:20000,
    stock:10
  }
]
 */

/* let productos=[]
let prodHay=false

product=()=>productos

let ultId=productos.length */

//console.log(`Tamaño del arreglo:${ultId}`)
//console.log(`Tamaño de la funcion arreglo:${product().length}`)


export const funcProductos = {

  //Envia todos los productos
  //
  getProductos: async (req, res, next) => {
    try {
      let productos = await api.findAll();

      res.json({
        mensage: "Lista de Productos de la BD",
        productos,
        usuario: acceso,
      });
    } catch (error) {
      const error1 = new Error(
        `(getAll)-No se encuentran los productos error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },

  //Envia un producto por id
  //
  getProducto: async (req, res, next) => {
    try {
      const { id } = req.params;

      let prod = await api.findById(id);

      res.json({
        mensage: `Producto con id:${id}`,
        producto: prod,
        usuario: acceso
      });
    } catch (error) {
      const error1 = new Error(
        `(getId)-No se encuentra el producto error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },

  //Agrega un producto
  //
  postProducto: async (req, res, next) => {
    try {
      const { fecha, nombre, descripcion, codigo, urlFoto, precio, stock } =
        req.body;

      let producto = {
        fecha: calcFechaHora(),
        nombre,
        descripcion,
        codigo: Number(codigo),
        urlFoto,
        precio: Number(precio),
        stock: Number(stock),
      };
     

      let idProd = await api.create(producto);

      
      res.json({
        mensage: `Se agregó el producto con id:${idProd}`,
        producto,
      });
    } catch (error) {
      const error1 = new Error(
        `(post)-No se pudo agregar un producto error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }
  },

  //Agrega un producto desde un formulario
  //
  postFormProducto: async (req, res,next) => {
    try {
      const { fecha, nombre, descripcion, codigo, urlFoto, precio, stock } =
        req.body;

      let producto = {
        fecha: calcFechaHora(),
        nombre,
        descripcion,
        codigo: Number(codigo),
        urlFoto,
        precio: Number(precio),
        stock: Number(stock),
      };

      let prod = await api.create(producto);

      res.redirect("/");

    } catch (error) {
      const error1 = new Error(
        `(post)-No se pudo agregar un producto desde el formulario error: ${error}`
      );
      error.httpStatusCode = 400;

      return next(error1);
    }

   



  },

  //Modifica un producto
  //
  putProducto: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fecha, nombre, descripcion, codigo, urlFoto, precio, stock } =
        req.body;

      let producto = {
        fecha: calcFechaHora(),
        nombre,
        descripcion,
        codigo,
        urlFoto,
        precio,
        stock,
      };

      let prod = await api.editById(id, producto);

      res.json({
        mensage: `Se modificó el producto con id:${id}`,
        producto,
      });
    } catch (error) {
      const error1 = new Error(
        `(put)-No se pudo modificar el producto error: ${error}`
      );
      error.httpStatusCode = 400;
      return next(error1);
    }
  },

  //Borrar un producto
  //
  deleteProducto: async (req, res, next) => {
    try {
      const { id } = req.params;

      let producto = await api.findById(id);

      let prod = await api.deleteById(id);

      res.json({
        mensage: `Se borró el producto con id:${id}`,
        producto
      });
    } catch (error) {
      const error1 = new Error(
        `(delete)-No se pudo borrar el producto, error: ${error}`
      );
      error.httpStatusCode = 400;
      return next(error1);
    }
  },
};
