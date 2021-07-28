<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item prop="user" label="用户名/邮箱">
      <el-input
        type="text"
        placeholder="请输用户名或者邮箱号"
        required="required"
        v-model="ruleForm.user"
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
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'BbsLogin',
  methods: {
    validateUser: (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名或者邮箱不能为空'))
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
    }
  },
  data () {
    return {
      // 获取url地址后面的参数
      urlQuery: '',
      ruleForm: {
        user: '',
        password: ''
      },
      rules: {
        user: [{required: true, validator: this.validateUser, trigger: 'blur'}],
        password: [{required: true, validator: this.validatePassword, trigger: 'blur'}]
      }
    }
  }
}
</script>
