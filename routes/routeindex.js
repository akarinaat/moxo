const express = require('express');
const app = express();
const Carrito = require("../models/carrito");
const Customer = require("../models/customers");
const Product = require("../models/product");
//const verify = require("../middleware/verifyAccess");

app.get('/login', function(req,res) {
	res.render('login');
});

app.get('/register', function(req,res) {
	res.render('register');
});

app.post('/addCustomer', async function(req,res) {
	var customer = new Customer(req.body);
	customer.password = customer.encryptPassword(customer.password);

	await customer.save();
	res.redirect('/login');
});

app.get('/', (req,res) => {
    res.render('index');
    
})

app.get('/accesorios', (req,res) => {
    res.send('ACCESORIOS');
})

app.get('/juguetes', (req,res) => {
    res.send('JUGUETES');
})

app.get('/muebles', (req,res) => {
    res.send('MUEBLES');
})

app.get('/comida', (req,res) => {
    res.send('COMIDA');
})

app.get('/carrito', (req,res) => {
    res.send('CARRITO');
})

app.get('/pago', (req,res) => {
    res.send('PAGO');
})

app.get('/login', (req,res) => {
    res.send('LOGIN');
})

app.get('/registro', (req,res) => {
    res.send('REGISTRO');
})


app.get('/myAccount/:id',   async(req,res) =>{

    var id = req.params.id;
    var customer = await Customer.findById(id);
    res.render('myAccount',{customer})
})

app.post('/updateAccount/:id',   async(req,res) =>{

    //req.body
    var id = req.params.id;
    await Customer.updateOne({_id: id}, req.body)
    res.redirect('/')
})

module.exports = app

