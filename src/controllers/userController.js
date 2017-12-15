var userController = (User) => {
  var post = (req, res) => {
    var user = new User(req.body)
    user.save()
    res.status(201).send(user)
  }

  var get = (req, res) => {
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
  }

  return {
    post: post,
    get: get
  }
}

module.exports = userController
