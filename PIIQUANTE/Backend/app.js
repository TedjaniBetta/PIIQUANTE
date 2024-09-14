const express = require('express');
const app = express();
const path = require ('path')
const usersRoutes = require ('./routes/users')
const saucesRoutes = require ('./routes/sauces')
require('dotenv').config()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

const { default: mongoose } = require("mongoose");
const users = require('./models/users');
const sauces = require('./models/sauces')

mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log('Connexion mongodb : Réussi');
    })
    .catch((error) =>{
    })

    app.use('/images', express.static(path.join(__dirname,'images')))    
    app.use('/api/auth', usersRoutes)
    app.use('/api/sauces', saucesRoutes)
    module.exports = app;

