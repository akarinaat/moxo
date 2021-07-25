var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ProductInCartScheme = Schema ({
    //me causa ruido
    idCustomer: String,
    idProduct: String,
    cantidad: Number
    
})


module.exports = mongoose.model('productsincart', ProductInCartScheme);