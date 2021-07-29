<template>
<div class="user_con">
  <el-button type="danger" size="mini" round @click="goIndex">返回首页</el-button>
  <el-button @click="login=!login" type="success">切换登陆/注册</el-button>
  <BbsLogin v-show="login" class="form" ref="BbsLogin"></BbsLogin>
  <BbsRegister v-show="!login" class="form" ref="BbsRegister"></BbsRegister>
</div>
</template>

<script>
import BbsLogin from './BbsLogin'
import BbsRegister from './BbsRegister'
import {cookie} from '../tool'

export default {
  methods: {
    goIndex () {
      this.$router.push('/')
    },
    setLoginTure () {
      this.login = this
    }
  },
  components: {
    'BbsLogin': BbsLogin,
    'BbsRegister': BbsRegister
  },
  name: 'BbsUser',
  data () {
    return {
      login: true
    }
  },
  mounted () {
    const sessionKey = cookie('session_key')
    if (sessionKey) {
      if (window.localStorage.getItem(sessionKey)) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.user_con {
  margin-top: 50px;
  margin-left: 30%;
  margin-right: 40%;
  background-color: cadetblue;
  padding: 2% 4% 2% 2%;
  border-radius: 2%;
}
.form{
  text-align: left;
}
.el-button{
  margin-bottom: 40px;
}
</style>
