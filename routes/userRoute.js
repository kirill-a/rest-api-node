var express = require('express')

var routes = (User) => {
    var router = express.Router()

    router.route('/')
        .post((req, res) => {
            var user = new User(req.body)
            user.save()
            res.status(201).send(user)
        })
        .get((req, res) => {
            var query = {}
            if (req.query.jobTitle) {
                query.jobTitle = req.query.jobTitle
            }
            User.find(query, (err, usersResult) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.json(usersResult)
                }
            })
        })

    router.route('/:userId')
        .get((req, res) => {
            User.findById(req.params.userId, (err, usersResult) => {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.json(usersResult)
                }
            })
        })

    return router
}

module.exports = routes

