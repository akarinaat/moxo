/*const express = require('express');
const app = express();*/
const { Router } = require('express');
const app = Router();
const Carrito = require("../models/carrito");
const Customer = require("../models/customers");
const Product = require("../models/product");
const verify = require("../middleware/verifyAccess");
var jwt = require("jsonwebtoken");
const _ProductInCart = require('../models/carrito');

var id ="";

var flash = require("connect-flash");


app.get('/login', function(req,res) {
	res.render('login');
});

app.post('/login', async function(req,res) {
	var email = req.body.email;
	var password = req.body.password;

	var customer = await Customer.findOne({email:email});
	
	if (!customer) { // Si no existe el usuario
		req.flash('message', 'Invalid User - Unregistered mail');
		res.redirect("/login");
		//return res.status(404).send("El usuario no existe. Regrese a Login e intente de nuevo");;
	}
	else { // Si el usuario sí existe, validar contraseña
		var valid = await customer.validatePassword(password);
		

		if (valid) { // Si la contraseña es válida, crear un token
			var token = jwt.sign({id: customer.email, permission: true}, "moxoSecretSign", {expiresIn: "1h"});
			console.log(token);
			id=customer._id
			console.log(id);

			// Guardamos el Token en las Cookies del usuario y redireccionamos a Home
			res.cookie("token", token, {httpOnly: true});
			res.redirect("/");
		}
		else { // Si la contraseña no es válida
			console.log("Password is not valid");
			req.flash('message', 'Incorrect Password');
			res.redirect("/login");
		}
	}
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

app.get('/', verify,  function(req,res) {
    res.render('index');
})

app.get('/cart', async (req,res) =>{

// var pinc = new _ProductInCart(req.body);
// await pinc.save();
// res.redirect('/cart');
	
})

app.get('/juguetes', (req,res) => {
    res.render('juguetes');
})

app.get('/muebles', (req,res) => {
    res.render('muebles');
})

app.get('/comida', (req,res) => {
    res.render('comida');
})

app.get('/carrito', async(req,res) => {
	var carrito = await Carrito.find({'idCustomer' : id});
	console.log(id)
	console.log(carrito)
    res.render('cart',{carrito})
})

// Ruta que nos permita eliminar items con el método "deleteOne"
app.get('/deleteItem/:idProduct',  async (req,res) =>{

	var idProduct = req.params.idProduct;
	await Carrito.remove({idCustomer: id, idProduct: idProduct});
	res.render('cart',{carrito})
  })

app.get('/pago', (req,res) => {
    res.render('checkout');
})

app.get('/login', (req,res) => {
    res.send('LOGIN');
})

app.get('/registro', (req,res) => {
    res.send('REGISTRO');
})

app.get('/myAccount',   async(req,res) =>{

    var customer = await Customer.findById(id);
    res.render('myAccount',{customer})
})

app.post('/updateAccount/:id',   async(req,res) =>{

    //req.body
    var id = req.params.id;
    await Customer.updateOne({_id: id}, req.body)
    res.redirect('/myAccount')
})

app.get('/logoff', async (req,res) => {
	res.clearCookie("token");
	res.redirect('/');
})

module.exports = app