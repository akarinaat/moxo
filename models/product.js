var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ProductScheme = Schema ({
    categoria: String,
    nombre: String,
    description: String,
    price: Number,
    status: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model('products', ProductScheme);