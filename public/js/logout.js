

cargarLogout=()=>{

  console.log("Cargando Despedida....")

  // Petición HTTP Renderiza el usuario Logeado
  fetch("http://localhost:8080/api/login/logout")
  .then((response) => response.text())
  .then(data=>{
        const nombreUs=JSON.parse(data)
        console.log(nombreUs.Nombre)

        nombreUsuario = {
          titulo: "Renderizado Usuario Usando Motor Handlebars",
          usuario:nombreUs.Nombre
          };

          console.log(nombreUsuario)

          let template = document.getElementById("handlebLogoutUsuario").innerHTML;
          let compile = Handlebars.compile(template);
         
          let compiledHTML = compile(nombreUsuario);
         
          document.getElementById('rendLogoutUsuario').innerHTML=compiledHTML

           
        })  
               
};

cargarLogout()





