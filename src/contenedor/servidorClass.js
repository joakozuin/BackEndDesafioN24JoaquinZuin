
import  express from 'express'
import  morgan from 'morgan'

import productoRuta from '../rutas/producto.js'
import carritoRuta from '../rutas/carrito.js'
import loginRuta from '../rutas/login.js'
import apiRuta from '../rutas/index.js'

import session from 'express-session';
import sessionFileStore from 'session-file-store'
const fileStore=sessionFileStore(session)

import MongoStorage from 'connect-mongo'

import {Server as ioServer} from 'socket.io'
import http from 'http'

import {funcUtil} from '../util/util.js'
const{calcFechaHora}=funcUtil

class Servidor {
  constructor(login) {
    this.app = express();
    this.port = process.env.PORT || "8080";

    this.httpServer = http.createServer(this.app);

    this.io = new ioServer(this.httpServer);

    //Middlewares
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.static(process.cwd() + "\\public"));
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      session({
        secret: 'Secreto',
        cookie: { maxAge: 1000 * 60 },
        saveUninitialized: true,
        resave: true,

        //sesiones locales
        //store:new fileStore({path:'./sesiones',ttl:30}), 

        //sesiones MongoDB 
        //store:MongoStorage.cretae({mongoUrl:'mongodb://localhost/sesiones',ttl:30}), 

        //sesiones MongoDB Atlas
        store:MongoStorage.create({mongoUrl:'mongodb+srv://joakoBE:joakoBE@cluster0.pgubd90.mongodb.net/joaEcommerce?retryWrites=true&w=majority',ttl:30}) 
      })
    );
   


    // Ruta de la Api en http://localhost:8080/api
    // prefijo, por el tema de versiones de la API
    this.apiCaminos = {
      api: "/api",
      carritos:'/api/carritos',
      productos: "/api/productos",
      login: "/api/login",
    };

    this.usuario(login)

    this.rutas();
    this.manErrores();

    //Websocket
    //
    this.mensajes = [
      {
        email: "Juan@gmail.com",
        fecha: calcFechaHora(),
        texto: "Hola que tal...",
      },
      {
        email: "Joaquin@gmail.com",
        fecha: calcFechaHora(),
        texto: "Genial...",
      },
    ];

    this.productos=[];

   /*  this.webSocket(); */
  }

  

  webSocket() {
    this.io.on("connection", (cliente) => {
      console.log(`Nuevo Cliente Conectado id:${cliente.id}`);
      cliente.emit("mensaje", this.mensajes);

      //Modulo CHAT
      //
      cliente.on("nuevoMensaje", (mensaje) => {
        console.log("Nuevo Mensaje: " + mensaje.email);
        console.log("Nuevo Mensaje: " + mensaje.texto);
        
        const mens={
          email: mensaje.email,
          fecha: this.calcFechaHora(),
          texto: mensaje.texto,
        }

        this.mensajes.push(mens);

        /* console.log('Enviando Mensajes al cliente')
        this.io.sockets.emit("mensaje", this.mensajes); */

      });

     //Modulo Productos
     //
     cliente.on("nuevoProducto",(producto)=>{
        
       console.log("Servidor Nuevo Producto Titulo: " + producto.titulo);
       console.log("Servidor Nuevo Producto Precio: " + producto.precio);
       console.log("Servidor Nuevo Producto Thumbnail: " + producto.thumbnail);

       const prod={
          titulo: producto.titulo,
          precio: producto.precio,
          thumbnail:producto.thumbnail
        }

       this.productos.push(prod)

      /*  console.log('Servidor Enviando Producto al cliente')
       this.io.sockets.emit("producto", this.productos); */

    });

        console.log('Enviando Mensajes al cliente')
        this.io.sockets.emit("mensaje", this.mensajes);

        console.log('Servidor Enviando Producto al cliente')
        this.io.sockets.emit("producto", this.productos);

    });

  }

   usuario(login){
    if(login=='admin'){
      console.log('Se ha Conectado un: Administrador')
      console.log('---------------------------------')
      this.app.use(function(reg,res,next){
        global.acceso=true //acceso administrador
        next()
        });

   }else{
     console.log('Se ha Conectado un: Usuario')
     console.log('---------------------------')
      this.app.use(function(reg,res,next){
        global.acceso=false //acceso usuarios
        next()
      });
   }}


  rutas() {
    this.app.use(this.apiCaminos.api, apiRuta);
    this.app.use(this.apiCaminos.productos, productoRuta);
    this.app.use(this.apiCaminos.carritos, carritoRuta);
    this.app.use(this.apiCaminos.login, loginRuta);
  }
  

  manErrores() {
    this.app.use((err, req, res, next) => {
      res.json({
        Mensage: "Ha ocurrido un error",
        Error: err.message,
        status: err,
      });
      //return next()
    });
  }

  
  escuchando() {
    this.httpServer.listen(this.port, () => {
      console.log(`Servidor respondiendo en el puerto ${this.port}`);
    });
  }
}

export default  Servidor