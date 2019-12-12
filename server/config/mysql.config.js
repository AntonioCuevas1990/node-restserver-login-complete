require("./config");

const Sequelize = require("sequelize");

//Creando conexion a MySQL
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.NAME,
    process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("La conexion a MySQL ha sido establecida.");
    })
    .catch(err => {
        console.error("No se pudo conectar a la base de datos de MySQL:", err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuarios = require("../models/user")(sequelize, Sequelize);

module.exports = db;