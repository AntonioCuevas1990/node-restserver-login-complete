/*module.exports = function(app) {
    const users = require("../controllers/user-controller");

    // Create a new User
    app.post("/api/usuarios", users.create);

    // Retrieve all User
    app.get("/api/usuarios", users.findAll);

    // Retrieve a single User by Id
    app.get("/api/usuarios/:userId", users.findByPk);

    // Update a User with Id
    app.put("/api/usuarios/:userId", users.update);

    // Delete a User with Id
    app.delete("/api/usuarios/:userId", users.delete);
};*/