const app = require('./app')
const db = require('./db/index')
const config = require('./config/base-config')

const PORT = config.serverPort || 5000

db.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  })
  .catch((error) => console.log(`Unable to connect to MongoDB server`))
