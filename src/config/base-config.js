
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  hostName: process.env.HOSTNAME,
  serverPort: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  mongooseOptions: {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
}