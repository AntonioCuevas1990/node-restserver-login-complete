const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models/index");
const path = require("path");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

db.sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
    .then(function(results) {
        db.sequelize.sync({ force: true }).then(() => {
            console.log("Borrar y Resincronizar con {force: true}");
        });
    });

const userController = require("./controllers/user-controller");
app.use(userController);

//Configuración global de rutas
app.use(require("./controllers/auth-controller"));

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});