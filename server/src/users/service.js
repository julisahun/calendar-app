const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { db } = require('../db/service.js')
const saltRounds = 10

exports.register = async (name, password, deviceId) => {
  const userId = await createUser(name, password)
  const userToken = await insertToken(userId)
  await saveDeviceToken(deviceId, userId)

  return userToken
}

async function createUser(name, password) {
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  const userId = uuid.v4()
  await db('users').insert({
    id: userId,
    name,
    password: encryptedPassword,
    createdAt: new Date(),
  })
  return userId
}

async function getUserById(id) {
  return db('users').select('*').where({ id }).first()
}

async function insertToken(userId) {
  const token = uuid.v4()
  await db('userTokens').insert({
    userId,
    token,
    valid: 1,
  })
  return token
}

async function getToken(userId) {
  return db('userTokens')
    .select('token')
    .where({ userId, valid: true })
    .first()
}

async function saveDeviceToken(deviceId, userId) {
  await db('deviceTokens')
    .insert({
      token: deviceId,
      userId,
    })
    .onConflict('token')
    .ignore()
}

exports.logIn = async (name, password, deviceId) => {
  console.log('login', name, password, deviceId)
  const users = await db('users').select('*').where({ name })
  for (let user of users) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (isPasswordCorrect) {
      let userToken = await getToken(user.id)
      if (!userToken) userToken = await insertToken(user.id)
      await saveDeviceToken(deviceId, user.id)
      return userToken
    }
  }
  throw new Error('User not found')
}

exports.validateToken = async (token) => {
  const userId = await db('userTokens')
    .select('userId')
    .where({ token })
    .first()
  if (!userId) return { valid: false }
  const user = await getUserById(userId)
  return { valid: !!user, user }
}

exports.getAll = async () => {
  let users = await db('users')
  console.log(users)
  return users
}
