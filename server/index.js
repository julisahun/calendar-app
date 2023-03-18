const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const db = require('./src/db/service.js')
const app = express()

const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/ping', (req, res) => {
  res.send('pong')
})