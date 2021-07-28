import axios from 'axios'
import config from './config'
import {Loading} from 'element-ui'
axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
axios.defaults.withCredentials = true
axios.defaults.crossDomain = true

let loading
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255,255,255,0)'
  })
}

function endLoading () {
  loading.close()
}

axios.interceptors.request.use(request => {
  startLoading()
  return request
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  endLoading()
  return response
}, err => Promise.resolve(err.response))

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
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: config.api + url,
      params,
      timeout: config.timeout
    })
  }
}
