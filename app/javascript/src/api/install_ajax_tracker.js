import axios from 'axios'

let pendingRequestCount = 0

axios.interceptors.request.use(config => {
  pendingRequestCount++
  return config
}, Promise.reject)

axios.interceptors.response.use(
  response => {
    pendingRequestCount--
    return response
  },
  error => {
    pendingRequestCount--
    return Promise.reject(error)
  }
)

window.pendingRequestCount = pendingRequestCount