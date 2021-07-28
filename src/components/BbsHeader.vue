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
    <el-col :span="4">
      <div></div>
    </el-col>
    <el-col :span="4">
      <div v-if="!info"><router-link :to="{ name: 'user'}">登录/注册</router-link></div>
      <div v-else>你好！{{info.a}}/{{info.b}} 注销</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'BbsHeader',
  props: {
    info: {
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
