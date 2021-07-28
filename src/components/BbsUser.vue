<template>
<div class="user_con">
  <el-button type="danger"><router-link :to="{ name: 'index'}">关闭</router-link></el-button>
  <el-button v-on:click="login=!login" type="success">切换登陆/注册</el-button>
  <BbsLogin v-show="login" class="form"></BbsLogin>
  <BbsRegister v-show="!login" class="form"></BbsRegister>
</div>
</template>

<script>
import BbsLogin from './BbsLogin'
import BbsRegister from './BbsRegister'

export default {
  components: {
    'BbsLogin': BbsLogin,
    'BbsRegister': BbsRegister
  },
  name: 'BbsUser',
  data () {
    return {
      login: true
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
</style>
