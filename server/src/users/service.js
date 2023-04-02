const bcrypt = require('bcrypt')
const db = require('../db/service.js')
const saltRounds = 10

exports.register = async (name, password) => {
  const encryptedPassword = await bcrypt.hash(password, saltRounds)
  console.log(encryptedPassword)
  await db.insert({ name, password: encryptedPassword }).into('users').exec()
}

exports.logIn = async (name, password) => {
  const users = await db.from('users').select('*').where({ name }).exec()
  for (let user of users) {
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (isPasswordCorrect) return
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
