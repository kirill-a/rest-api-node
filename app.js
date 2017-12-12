var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')

var db = mongoose.connect('mongodb://127.0.0.1:27017/userAPI',
{
    useMongoClient: true,
    bufferMaxEntries: 0},
    function(err) {
        if (err) {
            console.err(err);
        } else {
            console.log('Connected to db');
        }
    }
)

var User = require('./models/userModel')
var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json)

var router = express.Router()

router.route('/users')
    .post((req, res) => {
        var user = new User(req.body)

        console.log(user)
        res.send(user)
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

router.route('/users/:userId')
    .get((req, res) => {
        User.findById(req.params.userId, (err, usersResult) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(usersResult)
            }
        })
    })

app.use('/api', router)

app.get('/', (req, res) => {
    res.send("Welcome to users API")
})

app.listen(port, () => {
    console.log("Running on port " + port)
})