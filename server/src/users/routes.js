const service = require('./service.js')
const router = require('express').Router()

router.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body
    await service.register(name, password)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body
    await service.logIn(name, password)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await service.getAll()
    res.send(users)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
})

module.exports = router