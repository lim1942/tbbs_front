<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item prop="username" label="用户名">
      <el-input
        type="text"
        placeholder="请输用户名"
        required="required"
        v-model="ruleForm.username"
        prefix-icon="el-icon-user-solid"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱">
      <el-input
        type="text"
        placeholder="请输入邮箱"
        required="required"
        v-model="ruleForm.email"
        prefix-icon="el-icon-user-solid"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input
        type="password"
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        v-model="ruleForm.password"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password2" label="确认密码">
      <el-input
        type="password"
        placeholder="请再次输入密码"
        prefix-icon="el-icon-lock"
        v-model="ruleForm.password2"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="create_user('ruleForm')">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from '@/api'
export default {
  name: 'BbsLogin',
  methods: {
    create_user: function (formName) {
      const ResponseHandle = (response) => {
        if ([200, 201, 202].indexOf(response.status) !== -1) {
          // 提示注册成功
          this.$notify({
            title: '注册成功!去登陆吧',
            message: response.data['username'],
            type: 'success',
            duration: 10000
          })
          // 清空表单
          this.clear_form()
          // 切换到登录,耦合性有些强，大项目不可以这么调用父类的方法
          this.$parent.setLoginTure()
        } else {
          for (const key in response.data) {
            // 注册校验失败
            const value = response.data[key]
            this.$notify({
              title: key,
              message: JSON.stringify(value),
              type: 'warning',
              duration: 10000
            })
          }
        }
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.post('users/manage/ ', this.ruleForm).then(response => (ResponseHandle(response)))
        } else {
          return false
        }
      })
    },
    clear_form: function () {
      this.ruleForm.username = null
      this.ruleForm.email = null
      this.ruleForm.password = null
      this.ruleForm.password2 = null
    }
  },
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('邮箱不能为空'))
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
    const validatePassword2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        username: null,
        email: null,
        password: null,
        password2: null
      },
      rules: {
        username: [{required: true, validator: validateUsername}],
        email: [{required: true, validator: validateEmail}],
        password: [{required: true, validator: validatePassword}],
        password2: [{required: true, validator: validatePassword2}]
      }
    }
  }
}
</script>
