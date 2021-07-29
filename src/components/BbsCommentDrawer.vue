<template>
<div>
  <div class="drawer_item" @click="addNewComment(drawer_item)">
    <div class="comment_content">{{drawer_item.msg}}</div>
    <div class="comment_bottom">
      <i class="el-icon-user-solid"></i><span class="comment_bottom_item">{{ drawer_item.pub_username }} </span>
      <i class="el-icon-date"></i><span class="comment_bottom_item">{{handleDate(Date.parse(drawer_item.created_time))}}</span>
      <i class="el-icon-chat-line-round"></i><span class="comment_bottom_item">{{drawer_item.child_cnt}} <em>点击进行评论</em></span>
    </div>
  </div>
  <div v-for="(item,i) in drawer_comment" :class="i%2===0?'bg1':'bg2'">
    <div class="comment_content"><i class="el-icon-user-solid"></i><em style="color: blue">{{getCommentPrefix(item)}}</em> 说： {{item.msg}}</div>
    <div class="comment_content">
      <i class="el-icon-date"></i><span class="comment_bottom_item">{{handleDate(Date.parse(item.created_time))}}</span>
      <el-button size="mini" plain style="float: right" circle @click="addNewComment(item)">回复</el-button>
    </div>
  </div>
  <el-pagination
    style="padding-top: 20px"
    background
    @current-change="getDrawerComment"
    :current-page.sync="drawer_page"
    :page-sizes="[10,20]"
    :page-size="drawer_size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="drawer_total">
  </el-pagination>
</div>
</template>

<script>
import api from '@/api'
import {handleDate, cookie} from '@/tool/index'
export default {
  name: 'BbsCommentDrawer',
  data () {
    return {
      drawer_item: null,
      drawer_total: 0,
      drawer_size: 10,
      drawer_page: 1,
      drawer_comment: []
    }
  },
  methods: {
    handleDate: handleDate,
    getDrawerComment () {
      const ResponseHandle = (response) => {
        if (response.data) {
          this.drawer_total = response.data.count
          this.drawer_comment = response.data.results
        } else {
          this.$notify({
            title: '获取留言数据错误',
            type: 'warning',
            duration: 10000
          })
        }
      }
      api.get('comment/entry/', {root: this.drawer_item_id, page: this.drawer_page, size: this.drawer_size}).then(response => (ResponseHandle(response)))
    },
    getCommentPrefix: function (item) {
      if (item.parent === item.root) {
        return item.pub_username
      } else {
        return item.pub_username + ' @' + item.parent_username
      }
    },
    addNewComment: function (item) {
      if (cookie('session_key') && window.localStorage.getItem(cookie('session_key'))) {
        api.postComment(item.id, '回复: ' + item.pub_username)
      } else {
        this.$message('请先登录吧')
      }
    }
  },
  mounted () {
    const ResponseHandle = (response) => {
      if (response.data) {
        this.drawer_item = response.data
      } else {
        this.$notify({
          title: '获取留言数据错误',
          type: 'warning',
          duration: 10000
        })
      }
    }
    api.get('comment/entry/' + this.drawer_item_id).then(response => (ResponseHandle(response)))
    this.getDrawerComment()
  },
  props: {
    drawer_item_id: null
  }
}
</script>

<style scoped>
.drawer_item{
  display: inline-block;
  line-height: 45px;
  width:80%;
  border-radius:15px;
  background-color: chocolate;
}

.comment_content{
  padding-top: 20px;
  text-indent:10%;
  width: 100%;
  height: auto;
  word-wrap:break-word;
  word-break:break-all;
  overflow: hidden;
  line-height: 20px;
  font-size: 13px;
  text-align: left;
}
.comment_bottom{
  font-size: 13px;
}.comment_bottom_item{
   margin-right: 20px;
   margin-left: 5px;

 }
.bg1{
  background-color: cornsilk;
}
.bg2{
  background-color: darkgrey;
}
</style>
