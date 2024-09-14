const sauces = require('../models/sauces')

exports.like = (req, res, next) => {
    const userId = req.body.userId
    const like = req.body.like
    const sauceId = req.params.id

    // Permet de gerer les likes 

    if (like == 1) {
        sauces.findOne({_id: sauceId})
        .then((sauce) => {
            const isLikedByUser = sauce.usersLiked.includes(userId)
            if (!isLikedByUser) {
                sauces.updateOne({ _id: sauceId }, {
                    $push: { usersLiked: userId },
                    $inc: { likes: +1 }
                })
                    .then(() => res.status(200).json({ messge: 'Dislike ajouté !' }))
                    .catch(error => res.status(400).json({ error }))
            }
            else {
                res.status(200).json({ messge: 'Dislike ajouté !' })
            }
        })
    }

    // Permet de gerer es dislikes

    else if (like == -1) {
        sauces.findOne({_id: sauceId})
        .then((sauce) => {
            const isDislikedByUser = sauce.usersDisliked.includes(userId)
            if (!isDislikedByUser) {
                sauces.updateOne({ _id: sauceId }, {
                    $push: { usersDisliked: userId },
                    $inc: { dislikes: +1 }
                })
                    .then(() => res.status(200).json({ messge: 'Dislike ajouté !' }))
                    .catch(error => res.status(400).json({ error }))
            }
            else {
                res.status(200).json({ messge: 'Dislike ajouté !' })
            }
        })
    }

    // Permet de retirer les likes et Dislike

    else if (like == 0) {
        sauces.findOne({ _id: sauceId })
            .then((sauce) => {
                const isLikedByUser = sauce.usersLiked.includes(userId)
                if (isLikedByUser) {
                    sauces.updateOne({ _id: sauceId }, {
                        $pull: { usersLiked: userId },
                        $inc: { likes: -1 }
                    })
                        .then(() => res.status(200).json({ messge: 'Like Retiré !' }))
                        .catch(error => res.status(400).json({ error }))
                }
                const isDislikedByUser = sauce.usersDisliked.includes(userId)
                if (isDislikedByUser) {
                    sauces.updateOne({ _id: sauceId }, {
                        $pull: { usersDisliked: userId },
                        $inc: { dislikes: -1 }
                    })
                        .then(() => res.status(200).json({ messge: 'Like Retiré !' }))
                        .catch(error => res.status(400).json({ error }))
                }

            })
            .catch(error => res.status(400).json({ error }))
    }
}