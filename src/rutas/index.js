  //const router = require('express').Router()
  import express from 'express';
  const router = express.Router();
    
  function admin(reg,res,next){
    if(acceso){
      next()
    }else{
      //const error = new Error(`(Su perfil de usuario no tiene acceso a esta ruta`);

      const error = new Error(`Su perfil de usuario no tiene acceso a las rutas Post/Put/Delete`);

      error.httpStatusCode = 400;
      return next(error);
    }
  
  };


  router.get('/',admin, function (req, res) {
    
      res.status(200).json({ message: 'Perfil autorizado  conectado a la API' })
    
  })

  //module.exports = router
  export default router