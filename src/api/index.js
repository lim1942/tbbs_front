import axios from 'axios'
import config from './config'
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

function checkStatus (response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }
  return {
    data: {
      code: -404,
      message: response.statusText,
      data: ''
    }
  }
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url: config.api + url,
      data,
      timeout: config.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(checkStatus)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: config.api + url,
      params,
      timeout: config.timeout
    }).then(checkStatus)
  }
}
