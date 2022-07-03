

//const prompt = require('prompt-sync')();
//import prompt from 'prompt-sync';
import dotenv from 'dotenv';
dotenv.config();

import Servidor from './contenedor/servidorClass.js';

// const login='usuario'
 const login='admin'
 
//const login = prompt('(Usar admin o usuario)-->Login:');

console.log(`Hola-->  ${login}`);

arranServidor()

function arranServidor(){

    const servidor = new Servidor(login);
    servidor.escuchando();

}

