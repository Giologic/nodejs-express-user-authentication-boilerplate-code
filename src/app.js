const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const passportConfig = require('./config/passport-config')
const morgan = require('morgan');
const router = express.Router()
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false  }))

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
app.use(passport.initialize());
passportConfig(passport);

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/users/users.routes')

app.use(cors())
app.use('/api/v1', router)
authRoutes(router)
userRoutes(router)

app.get('/', (request, response) => {
  response.send({
    status: 'OK'
  })
})

module.exports = app