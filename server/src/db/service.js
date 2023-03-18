const admin = require('firebase-admin')
const serviceAccount = require('../../serviceAccountKey.json')

console.log(process.env.FIREBASE_DATABASE_URL)
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
  select = (fields) => {
    this.request.fields = fields
    return this
  }
  whereEq = (conditions) => {
    if (!this.request.where) this.request.where = []
    Object.entries(conditions).forEach(([field, value]) => {
      this.request.where.push({ field, op: 'eq', value })
    })
  }
  exec = () => {
    console.log(this.request)
  }
}
const firebase = admin.database()

firebase.ref('users').orderByChild('nombre').equalTo('juan').on('child_added', (snapshot) => {
  console.log(snapshot.val())
})
module.exports = new db()