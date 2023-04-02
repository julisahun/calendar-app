import axios from 'axios'

axios.get(process.env.DEPLOY_WEBHOOK).catch((err) => {
  console.log(err)
})
