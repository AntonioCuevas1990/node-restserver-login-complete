const express = require("express");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = db.usuarios;
const clientRedis = require("../models/redis");

/* Ruta para registro de nuevo usuario
========================================================= */
router.post("/register", async(req, res) => {
    try {
        let user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        let data = await user.authorize();

        let id = data.authToken.dataValues.id;
        let token = data.authToken.dataValues.token;

        clientRedis.hset(token, id, JSON.stringify(data));

        // En la variable data se encuentra toda la información del Usuario

        return res.json({
            ok: true,
            user
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
});

/* Ruta para el login
========================================================= */
router.post("/login", async(req, res) => {
    let body = req.body;
    let username = req.body.username;
    let password = req.body.password;
    const user = await User.findOne({ where: { username } });

    if (!username || !password) {
        return res.status(400).send("Request missing username or password param");
    }

    try {
        if (bcrypt.compareSync(password, user.password)) {
            return res.json({
                ok: true,
                usuario: user,
                token: "123"
            });
        }
    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
});

module.exports = router;