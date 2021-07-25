var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CustomerScheme = Schema ({
    nombre: String,
    email: String,
    password: String
})


module.exports = mongoose.model('customers', CustomerScheme);