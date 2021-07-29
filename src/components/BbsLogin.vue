<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item prop="username_email" label="用户名/邮箱">
      <el-input
        type="text"
        placeholder="请输用户名或者邮箱号"
        required="required"
        v-model="ruleForm.username_email"
        prefix-icon="el-icon-user-solid"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        type="password"
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        v-model="ruleForm.password"
        @keyup.enter.native="toSubmitForm('ruleForm')"
      ></el-input>
    </el-form-item>
    <el-form-item prop="remember" label="记住我">
      <el-switch v-model="ruleForm.remember"
        active-color="#13ce66"
        inactive-color="grey">
      </el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="do_login('ruleForm')">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from '@/api'
import {cookie} from '@/tool/index'
export default {
  name: 'BbsLogin',
  methods: {
    do_login: function (formName) {
      // 登录时清空浏览器本地缓存
      window.localStorage.clear()
      const ResponseHandle = (response) => {
        if ([200, 201, 202].indexOf(response.status) !== -1) {
          // 提示登录成功
          this.$notify({
            title: '登录成功',
            message: JSON.parse(response.data.info)['username'],
            type: 'success',
            duration: 10000
          })
          // 记录登录用户信息
          window.localStorage.setItem(cookie('session_key'), response.data.info)
          // 清空表单
          this.clear_form()
          // 切换到首页,耦合性有些强，大项目不可以这么调用父类的方法
          this.$parent.goIndex()
        } else {
          // 注册校验失败
          this.$notify({
            title: '登录错误',
            message: response.data.msg,
            type: 'warning',
            duration: 10000
          })
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.post('users/login/', this.ruleForm).then(response => (ResponseHandle(response)))
        } else {
          return false
        }
      })
    },
    clear_form: function () {
      this.ruleForm.username_email = null
      this.ruleForm.password = null
    }
  },
  data () {
    const validateUser = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名或者邮箱不能为空'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username_email: null,
        password: null,
        remember: false
      },
      rules: {
        username_email: [{required: true, validator: validateUser}],
        password: [{required: true, validator: validatePassword}]
      }
    }
  }
}
</script>
