const socket=io()

//const mensajesDiv=document.querySelector("#mensajes")
//const botonEnv=document.querySelector("#enviarMens")

//const prodDiv=document.querySelector("#rendProd")


//const botonCargTabla=document.querySelector("#cargarTabla")

/* socket.on('mensaje',(mensajes)=>{

  //console.log('Cliente recibe mensaje'+mensajes)

   mensajesDiv.innerHTML=mensajes.map(mensaje=>{
      return(
             `<div class="mui-row">
                <div class="mui-col-md-4">
                  <strong style="color:blue">${mensaje.email}</strong>
                </div>
                <div class="mui-col-md-3">
                  <p style="color:brown" >[${mensaje.fecha}]:</p>
                </div>
                <div class="mui-col-md-5 "mui--text-left"">
                  <p style="color:green; font-style:italic">${mensaje.texto}</p>
                </div>
             </div>`
           )

   }).join(" ")

}) */



/* botonEnv.addEventListener('click',(e)=>{
  //e.preventDefault()
  const inputEmail=document.querySelector("#email").value
  const inputTexto=document.querySelector('#texto').value
  
  const mensaje={
      email:inputEmail,
      texto:inputTexto
  }
   //console.log('Cliente envia mensaje'+mensaje)

   socket.emit('nuevoMensaje',mensaje)


}) */


//Cargar Usuario Logeado
//
cargarUsuario=()=>{

  console.log("Recibiendo Usuario Logeado del servidor");
  // Petición HTTP Renderiza el usuario Logeado
   fetch("http://localhost:8080/api/login")
    .then((response) => response.text())
    .then(data=>{
          const nombreUs=JSON.parse(data)
          console.log(nombreUs.Nombre)
  
          nombreUsuario = {
            titulo: "Renderizado Usuario Usando Motor Handlebars",
            usuario:nombreUs.Nombre
            };
  
            console.log(nombreUsuario)
  
           let template = document.getElementById("handlebUsuarioLogeado").innerHTML;
             let compile = Handlebars.compile(template);
  
             let compiledHTML = compile(nombreUsuario);
  
             document.getElementById('rendUsuarioLogeado').innerHTML=compiledHTML

             cargarProd()
             
          })  

}


//Pedir los nuevos productos
//
cargarProd=()=>{
  
  /* productos.map(producto=>{

      console.log(producto.titulo);
      console.log(producto.precio);

    })  */

  console.log("Cliente recibiendo Producto del servidor");
  // Petición HTTP Renderiza lado Servidor
   fetch("http://localhost:8080/api/productos")
      .then((response) => response.text())
       .then(data=>{
              const productos=JSON.parse(data)
              console.log(productos.productos)

             //Renderiza del lado del cliente usando HandleBard
             //
             let product = () =>productos.productos

             let prodHay=false
             let prodHayUa=false
             let prodHayUu=false

             let usuario=true

             if (product().length != 0) {
               prodHay = true;
              }

              if(prodHay){
                 if(usuario){
                  prodHayUa=true
                  prodHayUu=false
                 }else{
                  prodHayUa=false
                  prodHayUu=true
                 }
              }else{
                prodHayUa=false
                prodHayUu=false
              }

               productoClie = {
                   titulo: "Renderizado de Productos Usando Motor Handlebars",
                   prod: product(),
                   prodHay,
                   prodHayUa,
                   prodHayUu
                   };

                  let template = document.getElementById("handlebTablaProductos").innerHTML;
                    let compile = Handlebars.compile(template);

                    let compiledHTML = compile(productoClie);

                    document.getElementById('rendProd').innerHTML=compiledHTML

                   })  


}


cargarUsuario()



socket.on('producto',(productos)=>{
  console.log("Cliente recibiendo Producto del servidor");

  /* productos.map(producto=>{

      console.log(producto.titulo);
      console.log(producto.precio);

    })  */

  // Petición HTTP Renderiza lado Servidor

  /*  fetch("http://localhost:8080/api/productos/motorEjs")
      .then((response) => response.text())
       .then(data=>{
              const renderizar=document.getElementById("rend")
              renderizar.innerHTML=data
              console.log(data)
     })   */



  //Renderiza del lado del cliente usando HandleBard
  //
   let product = () => productos;
   let prodHay=false

   if (product().length != 0) {
     prodHay = true;
   }

   productoClie = {
     titulo: "Renderizado de Productos Usando Motor Handlebars",
     prod: product(),
     prodHay,
   };

   let template = document.getElementById("handlebTablaProductos").innerHTML;
   let compile = Handlebars.compile(template);

   let compiledHTML = compile(productoClie);

   document.getElementById('rendProd').innerHTML=compiledHTML

})






