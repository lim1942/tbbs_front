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
      <el-button type="primary" @click="create_user">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from '@/api'
export default {
  name: 'BbsLogin',
  methods: {
    create_user: function () {
      api.post('users/manage', this.ruleForm)
    },
    validateUsername: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    },
    validateEmail: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else {
        callback()
      }
    },
    validatePassword: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    },
    validatePassword2: (rule, value, callback) => {
      if (value !== this.ruleForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
  },
  data () {
    return {
      // 获取url地址后面的参数
      urlQuery: '',
      ruleForm: {
        username: null,
        email: null,
        password: null,
        password2: null
      },
      rules: {
        username: [{required: true, validator: this.validateUsername, trigger: 'blur'}],
        email: [{required: true, validator: this.validateEmail, trigger: 'blur'}],
        password: [{required: true, validator: this.validatePassword, trigger: 'blur'}],
        password2: [{required: true, validator: this.validatePassword2, trigger: 'blur'}]
      }
    }
  }
}
</script>
