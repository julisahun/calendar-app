const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

axios.get(process.env.DEPLOY_WEBHOOK).catch((err) => {
  console.log(err)
})
