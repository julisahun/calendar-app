const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const { db, messagering } = require('./src/db/service.js')
const userRoutes = require('./src/users/routes.js')
require('./src/mqtt/service.js')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/users', userRoutes)

app.get('/ping', async (req, res) => {
  const name = await db
    .from('users')
    .select('nombre')
    .where({ edad: 12 })
    .first()
    .exec()
  console.log(name)
  res.send('pong')
})
