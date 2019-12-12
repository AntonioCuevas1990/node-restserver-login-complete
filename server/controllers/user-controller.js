const db = require("../config/mysql.config");
const bcrypt = require("bcrypt");
const User = db.usuarios;

// Post a User
exports.create = (req, res) => {
    // Save to MySQL database
    //const hash = bcrypt.hashSync(req.body.password, 10);
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
};

// FETCH all Customers
exports.findAll = (req, res) => {
    User.findAll().then(user => {
        // Send all customers to Client
        res.send(user);
    });
};

// Find a Customer by Id
exports.findByPk = (req, res) => {
    User.findByPk(req.params.userId).then(user => {
        res.send(user);
    });
};

// Update a Customer
exports.update = (req, res) => {
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
};

// Delete a Customer by Id
exports.delete = (req, res) => {
    const id = req.params.userId;
    User.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).send("deleted successfully a customer with id = " + id);
    });
};