const Sequelize = require("sequelize");
require("../config/config");
const db = {};

//Creando conexion a MySQL
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.NAME,
    process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: process.env.DIALECT
    }
);

db.usuarios = require("./user")(sequelize, Sequelize);
db.tokens = require("./authtoken")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;