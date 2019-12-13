const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const db = require("./config/mysql.config");
const db = require("./models/index");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

db.sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0", { raw: true })
    .then(function(results) {
        db.sequelize.sync().then(() => {
            console.log("Borrar y Resincronizar con {force: true}");
        });
    });

const userController = require("./controllers/user-controller");
app.use(userController);

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto: ", process.env.PORT);
});