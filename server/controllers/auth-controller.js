const express = require("express");
const db = require("../models/index");
const User = db.usuarios;
const router = express.Router();
const passportFacebook = require("../auth/facebook");
const passportTwitter = require("../auth/twitter");
const passportGoogle = require("../auth/google");

/* Ruta del Login */
router.get("/login", function(req, res, next) {
    res.render("login", { title: "Please Sign In with:" });
});

/* Ruta del Logout */
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

/* Ruta de Facebook */
router.get("/facebook", passportFacebook.authenticate("facebook"));

router.get(
    "/facebook/callback",
    passportFacebook.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
        console.log(res);
        let body = req.body;
        console.log(body);
        res.redirect("/");
    }
);

/* Ruta de Twitter */
router.get("/twitter", passportTwitter.authenticate("twitter"));

router.get(
    "/twitter/callback",
    passportTwitter.authenticate("twitter", { failureRedirect: "/login" }),
    function(req, res) {
        res.redirect("/");
    }
);

/* Ruta de Google */
router.get(
    "/google",
    passportGoogle.authenticate("google", {
        scope: "https://www.google.com/m8/feeds"
    })
);

router.get(
    "/google/callback",
    passportGoogle.authenticate("google", { failureRedirect: "/login" }),
    async(req, res) => {
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
    }
);

module.exports = router;