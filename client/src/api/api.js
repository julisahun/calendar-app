import axios from 'axios'
import { BASE_URL } from '@env'

const get = (url, params) => {
  return axios.get(BASE_URL + url, { params })
}

const post = (url, data) => {
  return axios.post('https://192.168.1.88:3000/users/validate', data)
}

export default {
  get,
  post
}
