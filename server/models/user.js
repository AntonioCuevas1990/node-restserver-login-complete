module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM("activo", "inactivo"),
            defaultValue: "activo"
        }
    });

    User.associate = function(models) {
        User.hasMany(models.AuthToken);
    };

    User.prototype.authorize = async function() {
        const { AuthToken } = sequelize.models;
        const user = this;

        const authToken = await AuthToken.generate(this.id);

        return { user, authToken };
    };

    return User;
};