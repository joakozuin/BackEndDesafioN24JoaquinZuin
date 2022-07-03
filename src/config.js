
import serviceAccount from './firebaseClave.json'

export default{

    mongoDB:{
        URL:'mongodb+srv://joakoBE:joakoBE@cluster0.pgubd90.mongodb.net/joaEcommerce?retryWrites=true&w=majority',
        options:{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }
    },
    fireBase:{
        URL:'',
        options:serviceAccount
    },
    mariaDB: {
        client: "mysql",
        connection: {
          host: "127.0.0.1",
          user: "root",
          password: "",
          database: "ecommerce",
        },
        pool: { min: 0, max: 10 },
    },
    sqlite3: {
        client: "sqlite3",
        connection: {
          filename: "./dataBase/ecommerce.sqlite",
        },
        useNullAsDefault:true,
        pool: { min: 0, max: 10 },
     }
}