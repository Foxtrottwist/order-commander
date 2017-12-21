require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

require('./models/User')
require('./models/InventoryList')
require('./services/passport')
const loginRoute = require('./routes/loginRoute')
const createUserRoute = require('./routes/createUserRoute')
const inventoryRoute = require('./routes/inventoryRoute')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO, {
  useMongoClient: true,
})

const app = express()

app.use(bodyParser.json())

app.use('/login', passport.authenticate('local', { session: false }), loginRoute)
app.use('/api/create_user', createUserRoute)
app.use('/api/inventory_lists', passport.authenticate('jwt', { session: false }), inventoryRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// eslint-disable-next-line
app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))
