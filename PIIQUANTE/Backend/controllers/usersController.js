const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/users');
const { json } = require('express');
require('dotenv').config();

// Fonction pour enregistrer les nouveau utilisateur
exports.signup = ( req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message : 'Utilisateur crée ! '}))
        .catch(error => res.status(400).json({ error}));
    })
    .catch(error => res.status(500).json({ error}));
};

// Fonction pour ocnnecter les utilisateur existant
exports.login = ( req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (!user === null) {
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
        } 
        else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: ' Paire identifiant/mot de passe incorrecte'})
                }
                else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRETKEY,
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch(error => {
                res.status(500).json[{error}]
            })
        }
    })
    .catch(error => {
        res.status(500).json({error});
    })
};

exports.createUsers = (req, res, next) => {
    delete req.body._id;
    const user = new users({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Utilisateur enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getAllUsers = (req, res, next) => {
    users.find()
    .then(things => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }));
}

exports.getusers = (req, res) => {
    res.status(200).json({messge : 'Tout est ok'});
}

exports.getOneUsers = (req, res) => {
    res.status(200).json({messge : 'Tout est ok pour One Users'});
}
