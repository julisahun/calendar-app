const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
})

class db {
  request = {}
  from = (table) => {
    this.request.table = table
    return this
  }

  into = this.from

  select = (...fields) => {
    if (!fields.length) fields = ['*']
    this.request.select = fields
    return this
  }

  whereEq = (conditions) => {
    if (!this.request.where) this.request.where = []
    Object.entries(conditions).forEach(([field, value]) => {
      this.request.where.push({ field, op: 'eq', value })
    })
    return this
  }

  where = this.whereEq

  insert = (data) => {
    this.request.insert = data
    return this
  }

  update = (data) => {
    this.request.update = data
    return this
  }

  first = () => {
    this.request.first = true
    return this
  }

  exec = async () => {
    console.log(this.request)
    let returnArray = []
    let table = firebase.ref(this.request.table)
    let query = table
    if (this.request.where) {
      this.request.where.forEach((condition) => {
        query = query.orderByChild(condition.field)
        if (condition.op === 'eq') {
          query = query.equalTo(condition.value)
        }
      })
    }
    if (this.request.select && this.request.select.length) {
      const snapshot = await query.once('value')
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val()
        if (this.request.select[0] === '*') returnArray.push(data)
        else if (this.request.select.length === 1) {
          returnArray.push(data[this.request.select[0]])
        } else {
          let returnObject = {}
          this.request.select.forEach((field) => {
            returnObject[field] = data[field]
          })
          returnArray.push(returnObject)
        }
      })
    }
    if (this.request.insert) {
      await query.push(this.request.insert)
    }
    if (this.request.update) {
      const updates = {}
      const snapshot = await query.once('value')

      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key
        const childData = childSnapshot.val()
        updates[childKey] = {
          ...childData,
          ...this.request.update
        }
      })
      table.update(updates)
    }
    const first = this.request.first
    this.request = {}
    return first ? returnArray[0] : returnArray
  }
}
const firebase = admin.database()
const messagering = admin.messaging()

exports.messagering = messagering
exports.db = new db()
