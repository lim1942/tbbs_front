<template>
<div>
  <el-row v-for="(item,i) in comment" :class="i%2===0?'bg1':'bg2'">
    <div style="display: inline-block">
      <div class="comment_content">{{trim_string(item.msg)}}</div>
      <div class="comment_bottom">
        <i class="el-icon-user-solid"></i><span class="comment_bottom_item">{{ item.pub_username }} </span>
        <i class="el-icon-date"></i><span class="comment_bottom_item">{{handleDate(Date.parse(item.created_time))}}</span>
        <i class="el-icon-chat-line-round"></i><span class="comment_bottom_item">{{item.child_cnt}}</span>
      </div>
    </div>
    <div style="display: inline-block;float: right;padding-top:15px">
      <el-button size="mini" plain >回复</el-button>
      <el-button size="mini" plain @click="openDrawer(item)">查看详情</el-button>
    </div>
  </el-row>
  <el-pagination
    style="padding-top: 20px"
    background
    @current-change="getComment"
    :current-page.sync="page"
    :page-sizes="[10,20]"
    :page-size="size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
  <el-drawer
    size='50%'
    title="详情"
    :visible.sync="drawer"
    destroy-on-close>
    <BbsCommentDrawer :drawer_item="drawer_item"></BbsCommentDrawer>
  </el-drawer>
</div>
</template>

<script>
import api from '@/api'
import {handleDate} from '@/tool/index'
import BbsCommentDrawer from './BbsCommentDrawer'

export default {
  name: 'BbsContent',
  components: {
    'BbsCommentDrawer': BbsCommentDrawer
  },
  methods: {
    handleDate: handleDate,
    trim_string: function (s) {
      if (s.length > 30) {
        return s.slice(0, 30) + '...'
      } else {
        return s
      }
    },
    getComment: function () {
      const ResponseHandle = (response) => {
        if (response.data) {
          this.total = response.data.count
          this.comment = response.data.results
        } else {
          this.$notify({
            title: '获取留言数据错误',
            type: 'warning',
            duration: 10000
          })
        }
      }
      api.get('comment/entry/', {page: this.page, size: this.size}).then(response => (ResponseHandle(response)))
    },
    openDrawer: function (item) {
      this.drawer_item = item
      this.drawer = true
    }
  },
  data () {
    return {
      total: 0,
      size: 10,
      page: 1,
      comment: [],
      drawer: false,
      drawer_item: null
    }
  },
  mounted () {
    this.getComment()
  }
}
</script>

<style scoped>
  .el-row {
    padding: 6px;
    line-height: 160%;
    text-align: left;
  }
  .bg1{
    background-color: cornsilk;
  }
  .bg2{
    background-color: darkgrey;
  }
  .comment_content{
    text-indent:8%;
    color: #333333;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .comment_bottom{
  font-size: 10px;
  }.comment_bottom_item{
    margin-right: 20px;
     }
</style>
