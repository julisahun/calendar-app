const bcrypt = require('bcrypt')
const uuid = require('uuid')
const { db } = require('../db/service.js')
const saltRounds = 10

exports.register = async (name, password) => {
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  console.log(encryptedPassword)
  const userId = uuid.v4()
  await db.insert({ id: userId, name, password: encryptedPassword }).into('users').exec()
  const userToken = uuid.v4()
  await db.insert({ userId, token: userToken, valid: 1 }).into('userTokens').exec()
  return userToken
}

exports.logIn = async (name, password) => {
  const users = await db.from('users').select('*').where({ name }).exec()
  for (let user of users) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (isPasswordCorrect) {
      const userToken = await db.from('userTokens').select('token').where({ userId: user.id, valid: 1 }).first().exec()
      if (userToken) return userToken
      const newToken = uuid.v4()
      await db.insert({ userId: user.id, token: newToken, valid: 1 }).into('userTokens').exec()
      return newToken
    }
  }
  throw new Error('User not found')
}

exports.validateToken = async token => {
  const userId = await db.from('userTokens').select('userId').where({ token }).first().exec()
  console.log(userId)
  if (!userId) return { valid: false }
  const user = await db.from('users').select('*').where({ id: userId }).first().exec()
  return { valid: !!user, user }
}

exports.getAll = async () => {
  return await db.from('users').select('*').exec()
}
