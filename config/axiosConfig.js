import getConfig from 'next/config'
import axios from 'axios'

const { publicRuntimeConfig } = getConfig()
const http = axios.create({
  baseURL: publicRuntimeConfig.URL,
  timeout: 8000
})

export default http
