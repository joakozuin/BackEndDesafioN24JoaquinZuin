import {Router} from 'express'
const router = Router();

import {funcLogin} from '../controlador/login.js'

const {

      postLogin,
      getLogin,
      getLogout,
      getProductos,
      getProducto,
      admin,
   
    } =funcLogin

/* function admin(reg,res,next){
 if (acceso) {
   next();
 } else {
   const error = new Error(`(Su perfil de usuario no tiene acceso a esta ruta`);
   error.httpStatusCode = 400;
   return next(error);
 }
            
}; */


router.post('/',                       postLogin)

router.get('/',                         getLogin)

router.get('/logout',                 getLogout)

router.get('/productos',              getProductos)
router.get('/producto/:id',  admin,   getProducto)


export default router