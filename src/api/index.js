import axios from 'axios'
import Router from '../router';
import config from './config'
import {Loading, Message, MessageBox} from 'element-ui'
import {cookie} from '../tool'
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
  },
  postComment (parent, message) {
    MessageBox.prompt(message, '请输入200字以内', {
      inputType: 'textarea',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputErrorMessage: '字数过多'
    }).then(({ value }) => {
      const ResponseHandle = (response) => {
        if ([200, 201, 202].indexOf(response.status) !== -1) {
          Message({type: 'success', message: '发布成功'})
          window.location.reload()
        } else if (response.status === 403) {
          Message('无效用户，请重新登录')
          cookie('session_key', '')
        } else {
          Message(JSON.stringify(response.data))
        }
      }
      this.post('comment/entry/', {parent: parent, msg: value}).then(response => (ResponseHandle(response)))
    }).catch(() => {
      Message('取消')
    })
  }
}
