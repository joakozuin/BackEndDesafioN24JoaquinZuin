import mongoose from "mongoose";


export const carritosEsquema = new mongoose.Schema({
            fecha: {type:String, required:true},
            productos: [{
                fecha: {type:String, required:true},
                nombre:{type:String,required:true},
                descripcion:{type:String,required:true},
                codigo:{type:Number,required:true},
                urlFoto:{type:String,required:true},
                precio:{type:Number,required:true},
                stock:{type:Number,Default:0},
                cantidad:{type: Number,required:true,default:1}
              }]
        }
    );

