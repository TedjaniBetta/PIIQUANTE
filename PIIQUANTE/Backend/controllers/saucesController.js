const sauces = require ('../models/sauces')
const { json } = require('express');
const fs = require ('fs')

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const Sauces = new sauces({
        ...sauceObject, 
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    Sauces.save()
    .then(() => res.status(200).json({message : 'Sauces enregistré !'}))
    .catch(error => res.status(400).json({ error }))
}

exports.modifySauce = (req, res, next) => {
    let sauceObject = {}
    if (req.file){
        sauces.findOne({_id:req.params.id})
        .then((sauce) => {
            if (req.auth.userId != sauce.userId){
                res.statut(401).json({message : 'Non autorisé!'})
            }
            const fileName = sauce.imageUrl.split('/images/')[1]
            fs.unlink(`images/${fileName}`, (error) => {
                if (error){
                    throw error
                }
            })
        });
        sauceObject = {
            ...JSON.parse (req.body.sauce),
            imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
    }
    else {
        sauceObject = {...req.body}
    }
    sauces.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id})
    .then(() => res.status(200).json({message : 'Sauce modifié !'}))
    .catch(error => res.status(400).json({error}));
}

exports.deleteSauce = (req, res, next) => {
    sauces.findOne({_id: req.params.id})
    .then((sauce) => {
        if (req.auth.userId != sauce.userId){
            res.statut(401).json({message : 'Non autorisé!'})
        }
        else{
            const fileName = sauce.imageUrl.split('/images/')[1]
            fs.unlink(`images/${fileName}`, () => {
            sauces.deleteOne({_id: req.params.id})
            .then(() => res.status(200).json({message : 'Sauce supprimé !'}))
            .catch(error => res.status(400).json({error}));
        })}
    })
    .catch(error => res.status(400).json({error}));
}

exports.getOneSauce = (req, res, next) => {
    sauces.findOne({_id: req.params.id})
    .then(Sauces => res.status(200).json(Sauces))
    .catch(error => res.status(404).json({error}));
}

exports.getAllSauces = (req, res, next) => {
    sauces.find()
    .then(Sauces => res.status(200).json(Sauces))
    .catch(error => res.status(400).json({error}));
}