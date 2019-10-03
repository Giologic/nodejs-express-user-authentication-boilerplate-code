
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  hostName: process.env.HOSTNAME,
  serverPort: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DB_URL,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD
}