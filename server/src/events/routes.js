const service = require('./service.js')
const router = require('express').Router()

router.get('/events/:userId', async (req, res) => {
  const userId = req.params.userId
  console.log('userId', userId)
  const events = await service.getEventsByUserId(userId)
  res.send(events)
})

module.exports = router
