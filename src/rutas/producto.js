

import {Router} from 'express'
const router = Router();

import {funcProductos} from '../controlador/producto.js'

const {
  getProductos,
  getProducto,
  postProducto,
  postFormProducto,
  putProducto,
  deleteProducto
  } =funcProductos

     /* console.log('Dentro Rutas de producto')
     console.log(__dirname) */

function admin(reg,res,next){
  if(acceso){
     next()
   }else{
     const error = new Error(`(Su perfil de usuario no tiene acceso a esta ruta`);
     error.httpStatusCode = 400;
     return next(error);
   }
      
  };

router.get('/',              getProductos)
router.get('/:id',           getProducto)
router.post('/',     admin,  postProducto)
router.post('/form', admin,  postFormProducto)
router.put('/:id',   admin,  putProducto)
router.delete('/:id',admin,  deleteProducto)

export default router