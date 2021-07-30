var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var CarritoInCartScheme = Schema ({
    //me causa ruido
    idCustomer: String,
    idProduct: String,
    
})


module.exports = mongoose.model('carrito', CarritoInCartScheme);