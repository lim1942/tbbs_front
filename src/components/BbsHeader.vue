<template>
  <el-row >
    <el-col :span="4">
      <div></div>
    </el-col>
    <el-col :span="4">
      <div></div>
    </el-col>
    <el-col :span="4">
      <el-button @click="addNewComment">发布留言</el-button>
    </el-col>
    <el-col :span="4">
      <div></div>
    </el-col>
    <el-col :span="2">
      <div></div>
    </el-col>
    <el-col :span="6">
      <div v-if="!userinfo"><router-link :to="{ name: 'user'}">登录/注册</router-link></div>
      <div v-else style="font-size: 12px;line-height: 30px;margin-top: 15px">您好！<span style="color: blue">{{userinfo.username}}</span>
        <span style="color: darkcyan">{{userinfo.email}} </span><a href="/api/v1/users/logout/">注销</a></div>
    </el-col>
  </el-row>
</template>

<script>
import api from '@/api'
import {cookie} from '@/tool/index'

export default {
  name: 'BbsHeader',
  props: {
    userinfo: {
      default: null
    }
  },
  methods: {
    refresh: function () {
      window.location.reload()
    },
    addNewComment: function () {
      if (cookie('session_key')) {
        api.postComment(null, '发布新留言')
      } else {
        this.$message('请先登录吧')
      }
    }
  }
}
</script>

<style lang="scss" >
.el-col{
  min-height:1px;
}
</style>
