const admin = require('firebase-admin')
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

const { Client } = require('pg')

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD,
  DATABASE_PORT,
} = process.env

console.log({
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD,
  DATABASE_PORT,
})

const client = new Client({
  user: DATABASE_USER_NAME,
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_USER_PASSWORD,
  port: DATABASE_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
})

client.connect(function (err) {
  if (err) {
    throw err
  }
  console.log('Database connected!')
})

class db {
  constructor() {
    this.query = {
      select: [],
      from: '',
      where: [],
      orderBy: [],
      limit: 0,
      insert: [],
    }
  }

  select(...args) {
    this.query.select = args
    return this
  }

  from(table) {
    this.query.from = table
    return this
  }

  where(condition) {
    if (condition.length === 1 && typeof condition[0] === 'object') {
      this.query.where.push(
        Object.entries(condition[0]).map(([key, value]) => ({
          key,
          value,
          op: '=',
        }))
      )
    } else {
      this.query.where.push({
        key: condition[0],
        value: condition[2],
        op: condition[1],
      })
    }
    return this
  }

  insert(values) {
    this.query.insert.push(
      ...Object.entries(values).map(([key, value]) => ({ key, value }))
    )
    return this
  }

  into(table) {
    this.query.from = table
    return this
  }

  first() {
    this.query.limit = 1
    return this
  }

  async exec() {
    let text = ''
    let values = []
    console.log(this.query)
    if (this.query.select.length > 0) {
      text = `SELECT ${this.query.select.join(', ')} FROM ${
        this.query.from
      }`

      if (this.query.where.length > 0) {
        text += ' WHERE '
        text += this.query.where.map((condition) => {
          return condition
            .map(({ key, value, op }) => {
              values.push(value)
              return `${key} ${op} $${values.length}`
            })
            .join(' AND ')
        })
      }
      if (this.query.limit) {
        text += ` LIMIT ${this.query.limit}`
      }
    } else if (this.query.insert.length > 0) {
      text = `INSERT INTO ${this.query.from} (${this.query.insert
        .map(({ key }) => key)
        .join(', ')}) VALUES (`
      text +=
        this.query.insert
          .map(({ value }, index) => {
            values.push(value)
            return `$${index + 1}`
          })
          .join(', ') + ')'
    }

    let res = await client.query(text, values)
    let rows = res.rows
    if (this.query.select.length === 1 && this.query.select[0] !== '*')
      rows = rows.map((row) => row[this.query.select[0]])
    this.query = {
      select: [],
      from: '',
      where: [],
      orderBy: [],
      limit: 0,
      insert: [],
    }
    return this.query.limit === 1 ? rows[0] : rows
  }
}
const messagering = admin.messaging()

exports.messagering = messagering
exports.db = new db()
