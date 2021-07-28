var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var CustomerScheme = Schema ({
    nombre: String,
    email: String,
    password: String
})

// Funciones de métodos de Customers
CustomerScheme.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, 10);
}

CustomerScheme.methods.validatePassword = function(userPassword) {
    return bcrypt.compare(userPassword, this.password);
}

module.exports = mongoose.model('customers', CustomerScheme);