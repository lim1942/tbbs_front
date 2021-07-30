<template>
  <el-row >
    <el-col :span="4">
      <div></div>
    </el-col>
    <el-col :span="4">
      <div></div>
    </el-col>
    <el-col :span="4">
      <div>留言板</div>
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

export default {
  name: 'BbsHeader',
  props: {
    userinfo: {
      default: null
    }
  }
}
</script>

<style lang="scss" >
.el-col{
  min-height:1px;
}
</style>
