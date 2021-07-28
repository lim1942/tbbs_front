<template>
  <el-container>
    <!--侧边栏-->
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <BbsHeader></BbsHeader>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import BbsHeader from './BbsHeader'

export default {
  components: {
    'BbsHeader': BbsHeader,
  },
  name: 'index'
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 100%
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 100vh;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 100%;
}
</style>
