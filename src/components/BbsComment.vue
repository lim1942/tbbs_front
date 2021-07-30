<template>
<div>
  <div style="line-height: 50px">
    <textarea maxlength="200" @input="descInput" v-model="commentMsg" style="width: 80%;height: 100px"/>
    <span style="font-size: 10px">{{remnant}}/200</span><el-button size="small" type="primary" @click="addComment">发布</el-button>
  </div>
  <el-row v-for="(item,i) in comment" :class="i%2===0?'bg1':'bg2'">
    <div style="display: inline-block">
      <div class="comment_content">{{trim_string(item.msg)}}</div>
      <div class="comment_bottom">
        <i class="el-icon-user-solid"></i><span class="comment_bottom_item">{{ item.pub_username }} </span>
        <i class="el-icon-date"></i><span class="comment_bottom_item">{{item.created_time}}</span>
        <i class="el-icon-chat-line-round"></i><span class="comment_bottom_item">{{item.child_cnt}}</span>
      </div>
    </div>
    <div style="display: inline-block;float: right;padding-top:15px">
      <el-button size="mini" plain @click="openDrawer(item)">查看/回复</el-button>
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
</div>
</template>

<script>
import api from '@/api'
import BbsCommentDrawer from './BbsCommentDrawer'
import {Message} from 'element-ui'
import {cookie} from '../tool'

export default {
  name: 'BbsContent',
  components: {
    'BbsCommentDrawer': BbsCommentDrawer,
  },
  methods: {
    trim_string: function (s) {
      if (s.length > 30) {
        return s.slice(0, 30) + '...'
      } else {
        return s
      }
    },
    getComment: async function () {
      const response = await api.get('comment/entry/', {page: this.page, size: this.size})
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
    },
    openDrawer: function (item) {
      this.$router.push('/commentDrawer/' + item.id)
    },
    descInput () {
      const txtVal = this.commentMsg.length
      this.remnant = 200 - txtVal
    },
    async addComment () {
      if (!(cookie('session_key') && window.localStorage.getItem(cookie('session_key')))) {
        cookie('session_key', null)
        window.localStorage.clear()
        Message('请先登陆把')
        return
      }
      const response = await api.post('comment/entry/', {parent: null, msg: this.commentMsg})
      if ([200, 201, 202].indexOf(response.status) !== -1) {
        Message({type: 'success', message: '发布成功'})
        this.commentMsg = ''
        this.page = 1
        this.size = 10
        await this.getComment()
      } else if (response.status === 403) {
        Message('无效用户，请重新登录')
        cookie('session_key', null)
        window.location.reload()
      } else {
        Message(JSON.stringify(response.data))
      }
    }
  },
  data () {
    return {
      total: 0,
      size: 10,
      page: 1,
      comment: [],
      remnant: 200,
      commentMsg: ''
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
    margin-left: 5px;
     }
</style>
