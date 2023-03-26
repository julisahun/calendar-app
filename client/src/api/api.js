import axios from 'axios'
import { BASE_URL } from '@env'

const get = async (url, params) => {
  return axios.get(BASE_URL + url, { params })
}

const post = async (url, data) => {
  return axios.post(BASE_URL + url, data)
}

export default {
  get,
  post
}
