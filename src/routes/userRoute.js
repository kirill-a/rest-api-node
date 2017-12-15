var express = require('express')

var routes = (User) => {
  var router = express.Router()
  var userController = require('../controllers/userController')(User)
  router.route('/')
    .post(userController.post)
    .get(userController.get)
  // Middleware
  router.use('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, usersResult) => {
      if (err) {
        res.status(500).send(err)
      } else if (usersResult) {
        req.user = usersResult
        next()
      } else {
        res.status(404).send('no user found')
      }
    })
  })

  router.route('/:userId')
    .get((req, res) => {
      res.json(req.user)
    })
    .put((req, res) => {
      req.user.firstName = req.body.firstName
      req.user.lastName = req.body.lastName
      req.user.jobTitle = req.body.jobTitle
      req.user.isFulltime = req.body.isFulltime
      req.user.save((err) => {
        if (err) { res.status(500).send(err) } else {
          res.json(req.book)
        }
      })
    })
    .patch((req, res) => {
      if (req.body._id) { delete req.body._id }

      for (var i in req.body) {
        req.user[i] = req.body[i]
      }

      req.user.save((err) => {
        if (err) { res.status(500).send(err) } else {
          res.json(req.book)
        }
      })
    })
    .delete((req, res) => {
      req.user.remove((err) => {
        if (err) { res.status(500).send(err) } else {
          res.status(204).send('Removed the user')
        }
      })
    })

  return router
}

module.exports = routes
