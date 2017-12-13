var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/userAPI', {useMongoClient: true})
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database`)
})
mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open')
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose connection disconnected')
})
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})

var User = require('./models/userModel')
var app = express()
var port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Inject User object to not require it again in router
router = require('./routes/userRoute')(User)

app.use('/api/users', router)

app.get('/', (req, res) => {
  res.send('Welcome to users API')
})

app.listen(port, () => {
  console.log('Running on port ' + port)
})
