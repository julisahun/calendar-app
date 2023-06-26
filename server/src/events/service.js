const { db } = require('../db/service.js')

exports.getEventsByUserId = async (userId) => {
  let ownEvents = await db('events').where({ ownerUserId: userId })
  let relatedEvents = await db('userEvents').where({ userId })
  relatedEvents = await Promise.all(
    relatedEvents.map(async (event) => {
      return await db('events').where({ id: event.eventId }).first()
    })
  )
  return { ownEvents, relatedEvents }
}
