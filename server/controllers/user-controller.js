const express = require("express");
const db = require("../models/index");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = db.usuarios;
const clientRedis = require("../models/redis");

/* Register Route
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

/* Login Route
========================================================= */
router.post("/login", async(req, res) => {
    let body = req.body;
    let username = req.body.username;
    let password = req.body.password;
    const user = await User.findOne({ where: { username } });

    // if the username / password is missing, we use status code 400
    // indicating a bad request was made and send back a message
    if (!username || !password) {
        return res.status(400).send("Request missing username or password param");
    }

    try {
        // we will cover the user authenticate method in the next section
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

// Post a User
/*exports.create = (req, res) => {
            // Save to MySQL database
            User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
                })
                .then(user => {
                    // Send created User to client
                    //user.password = null;
                    res.json({
                        ok: true,
                        user
                    });
                })
                .catch(err => {
                    return res.status(400).send(err);
                    err;
                });
        };*/

// FETCH all Customers
/*exports.findAll = (req, res) => {
            User.findAll().then(user => {
                // Send all customers to Client
                res.send(user);
            });
        };*/

// Find a Customer by Id
/*exports.findByPk = (req, res) => {
            User.findByPk(req.params.userId).then(user => {
                res.send(user);
            });
        };*/

// Update a Customer
/*exports.update = (req, res) => {
            const id = req.params.userId;
            User.update({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }, {
                where: { id: req.params.userId }
            }).then(() => {
                res.status(200).send("updated successfully a user with id = " + id);
            });
        };*/

// Delete a Customer by Id
/*exports.delete = (req, res) => {
            const id = req.params.userId;
            User.destroy({
                where: { id: id }
            }).then(() => {
                res.status(200).send("deleted successfully a customer with id = " + id);
            });
        };*/

/*exports.login = (req, res) => {
            const { username, password } = req.body;

            // if the username / password is missing, we use status code 400
            if (!username || !password) {
                return res.status(400).send("Request missing username or password param");
            }

            try {
                let user = User.authenticate(username, password);
                user = user.authorize();
                return res.json(user);
            } catch (err) {
                return res.status(400).send("invalid username or password");
            }
        };*/

module.exports = router;