
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')
var passport = require('passport')
var config = require('./config/base-config')
var passportConfig = require('./config/passport-config')

var router = express.Router()
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false  }))

// Passport init
app.use(passport.initialize());
app.use(passport.session());

const connectWithRetry = () => {
  mongoose.connect(
    config.dbUrl, config.mongooseOptions).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    console.log('Error', err)
    setTimeout(connectWithRetry, config.port)
  })
}
connectWithRetry()

// Initialize Passport
app.use(passport.initialize());
passportConfig(passport);

var authRoutes = require('./api/auth/auth.routes')
var userRoutes = require('./api/users/users.routes')

app.use(cors())
app.use('/api/v1', router)
authRoutes(router)
userRoutes(router)

app.get('/', (request, response) => {
  response.send({
    status: 'OK'
  })
})

app.listen(config.serverPort, config.hostName, () => console.log(`Server running at ${config.hostName}:${config.serverPort}`))