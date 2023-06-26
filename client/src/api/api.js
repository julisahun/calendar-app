import axios from 'axios'
import { BASE_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'

let token
AsyncStorage.getItem('userToken').then((value) => {
  token = value
})

const api = axios.create()

api.interceptors.request.use(async (config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.url = `${BASE_URL}${config.url}`
  return config
})

export default api
