
import express from 'express';
const router = express.Router();


import {funcCarrito} from '../controlador/carrito.js'

const {
  getCarritos,
  getCarrito,
  getProdsCarrito,
  postCarrito,
  postProdCarrito,
  putCarrito,
  deleteCarrito,
  deleteProdCarrito
  }=funcCarrito

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

router.get('/',                       getCarritos)
router.get('/:id',                     getCarrito)
router.get('/:id/productos',           getProdsCarrito)
router.post('/',                       postCarrito)
router.post('/:id/productos/:id_prod', postProdCarrito)
router.delete('/:id/productos/:id_prod', deleteProdCarrito)
router.delete('/:id',                   deleteCarrito)

export default router