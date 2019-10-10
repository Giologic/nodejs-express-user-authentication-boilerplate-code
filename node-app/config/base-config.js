const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  serverPort: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DB_URL,
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