const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user");

passport.use(
    new GoogleStrategy({
            clientID: "102818384736-vtk2093moms2oui2r62ccesufe2npo77.apps.googleusercontent.com",
            clientSecret: "XIVJjeMGsWlBOTRV30e-rmb0",
            callbackURL: "http://localhost:3000"
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOrCreate({ googleId: profile.id }, function(err, user) {
                return done(err, user);
            });
        }
    )
);

module.exports = passport;