

cargarLogout=()=>{

  console.log("Cargando Despedida....")

  

 let template = document.getElementById("handlebLogout").innerHTML;
 let compile = Handlebars.compile(template);

 let compiledHTML = compile();

 document.getElementById('rendLogout').innerHTML=compiledHTML
               
};



cargarLogout()





