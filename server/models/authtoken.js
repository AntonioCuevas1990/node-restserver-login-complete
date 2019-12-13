module.exports = (sequelize, DataTypes) => {
    const AuthToken = sequelize.define(
        "AuthToken", {
            token: DataTypes.STRING
        }, {}
    );
    AuthToken.associate = function({ User }) {
        // associations can be defined here
        AuthToken.belongsTo(User);
    };
    // generates a random 36 character token and
    // associates it with a user
    AuthToken.generate = async function(UserId) {
        if (!UserId) {
            throw new Error("AuthToken requires a user ID");
        }

        let token = "";

        const possibleCharacters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 36; i++) {
            token += possibleCharacters.charAt(
                Math.floor(Math.random() * possibleCharacters.length)
            );
        }
        console.log(token);

        return AuthToken.create({ token, UserId });
    };
    return AuthToken;
};