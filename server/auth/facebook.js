const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const { Usuario } = require("../models/user");

passport.use(
    new FacebookStrategy({
            clientID: "679644549228230",
            clientSecret: "7a8741992db682d3520eca6259304fe3",
            callbackURL: "http://localhost:3000"
        },
        function(accessToken, refreshToken, done) {
            Usuario.findByPk({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    const datosUsuario = {
                        username: username,
                        email: email,
                        password: password
                    };
                    Usuario.create(datosUsuario).then(function(nuevoUsuario, created) {
                        if (!nuevoUsuario) {
                            return done(null, false);
                        }

                        if (nuevoUsuario) {
                            return done(null, nuevoUsuario);
                        }
                    })
                }



            });
        }
    )
);

module.exports = passport;