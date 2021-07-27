const express = require('express');
const app = express();

module.exports = app


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