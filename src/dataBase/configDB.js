const options = {
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
  },
};
//module.exports = { options };
export {options}
