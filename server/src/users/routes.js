const service = require('./service.js')
const router = require('express').Router()

router.post('/register', async (req, res) => {
  try {
    const { name, password, deviceId } = req.body
    await service.register(name, password, deviceId)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(400)
  }
})

router.post('/validate', async (req, res) => {
  const token = req.body.token
  if (token) {
    const { valid, user } = await service.validateToken(token)
    if (valid) {
      res.send(user)
      return
    }
  }
  res.sendStatus(401)
})

router.post('/login', async (req, res) => {
  try {
    const { name, password, deviceId } = req.body
    await service.logIn(name, password, deviceId)
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(400)
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await service.getAll()
    res.send(users)
  } catch (err) {
    res.sendStatus(400)
  }
})

module.exports = router
