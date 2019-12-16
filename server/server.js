const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models/index");
const path = require("path");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//hablitar la carpeta public
app.use(express.static(path.resolve(__dirname, "../public")));

db.sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
    .then(function(results) {
        db.sequelize.sync().then(() => {
            console.log("Borrar y Resincronizar con {force: true}");
        });
    });

const userController = require("./controllers/user-controller");
app.use(userController);

//Vistas
//Configuración global de rutas
app.use(require("./controllers/auth-controller"));

// habilitar la carpeta public
app.use(express.static(__dirname + "/public"));

// Configuración engine views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});