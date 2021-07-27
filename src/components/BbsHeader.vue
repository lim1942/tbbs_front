<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content">留言板</div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content"></div>
    </el-col>
    <el-col :span="4">
      <div v-if="!info" class="grid-content">登录/注册</div>
      <div v-else class="grid-content">你好！{{info.a}}/{{info.b}} 注销</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'BbsHeader',
  props: {
    info: {
      default: {a: 1, b: 2}
    }
  }
}
</script>

<style lang="scss">

.grid-content {
  min-height: 36px;
}
</style>
