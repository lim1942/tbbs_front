<template>
<div>
  <div class="drawer_item" @click="reply_item=null;toBottom()">
    <div class="comment_content">{{drawer_item.msg}}</div>
    <div class="comment_bottom">
      <i class="el-icon-user-solid"></i><span class="comment_bottom_item">{{ drawer_item.pub_username }} </span>
      <i class="el-icon-date"></i><span class="comment_bottom_item">{{drawer_item.created_time}}</span>
      <i class="el-icon-chat-line-round"></i><span class="comment_bottom_item">{{drawer_item.child_cnt}} <em>点击进行评论</em></span>
    </div>
  </div>
  <div v-for="(item,i) in drawer_comment" :class="i%2===0?'bg1':'bg2'" @click="reply_item=item;toBottom()">
    <div class="comment_content"><i class="el-icon-user-solid"></i><em style="color: blue">{{getCommentPrefix(item)}}</em> 说： {{item.msg}}</div>
    <div class="comment_content">
      <i class="el-icon-date"></i><span class="comment_bottom_item">{{item.created_time}}</span>
      <el-button size="mini" plain style="float: right" circle @click="reply_item=item;toBottom()">回复</el-button>
    </div>
  </div>
  <el-pagination
    style="padding-top: 20px;line-height: 50px"
    background
    @current-change="getDrawerComment"
    :current-page.sync="drawer_page"
    :page-sizes="[10,20]"
    :page-size="drawer_size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="drawer_total">
  </el-pagination>
  <div style="line-height: 50px">
    <div>
      <el-button @click="reply_item=null;commentMsg=''" size="mini">清除</el-button>
      <span>回复 {{getCommentHeader}}</span>
    </div>
    <textarea maxlength="200" @input="descInput" v-model="commentMsg" style="width: 80%;height: 100px" ref="bottom_textare"/>
    <span style="font-size: 10px">{{remnant}}/200</span><el-button size="small" type="primary" @click="addComment">发布</el-button>
  </div>
</div>
</template>

<script>
import api from '@/api'
import { cookie} from '@/tool/index'
import {Message} from 'element-ui'
export default {
  name: 'BbsCommentDrawer',
  data () {
    return {
      drawer_item: null,
      drawer_total: 0,
      drawer_size: 10,
      drawer_page: 1,
      drawer_comment: [],
      commentMsg: '',
      remnant: 200,
      reply_item: null
    }
  },
  computed: {
    getCommentHeader () {
      if (!this.reply_item) {
        return '层主'
      } else {
        return this.reply_item.pub_username + ' : ' + this.reply_item.msg
      }
    }
  },
  methods: {
    toBottom () {
      // 滚动内容的坐标位置0,50000：
      window.scrollTo(0, 50000)
      this.$refs['bottom_textare'].focus()
    },

    descInput () {
      const txtVal = this.commentMsg.length
      this.remnant = 200 - txtVal
    },
    async getDrawerComment () {
      const response = await api.get('comment/entry/', {
        root: this.drawer_item_id,
        page: this.drawer_page,
        size: this.drawer_size
      })
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
    },
    getCommentPrefix: function (item) {
      if (item.parent === item.root) {
        return item.pub_username
      } else {
        return item.pub_username + ' @' + item.parent_username
      }
    },
    async addComment () {
      if (!(cookie('session_key') && window.localStorage.getItem(cookie('session_key')))) {
        cookie('session_key', null)
        window.localStorage.clear()
        Message('请先登陆把')
        return
      }
      const response = await api.post('comment/entry/', {parent: (this.reply_item || this.drawer_item).id, msg: this.commentMsg})
      if ([200, 201, 202].indexOf(response.status) !== -1) {
        Message({type: 'success', message: '发布成功'})
        this.commentMsg = ''
        this.drawer_page = 1
        this.drawer_size = 10
        this.reply_item = null
        await this.getDrawerComment()
        await this.get_drawer_item()
        window.scrollTo(0, -50000)
      } else if (response.status === 403) {
        Message('无效用户，请重新登录')
        cookie('session_key', null)
        window.location.reload()
      } else {
        Message(JSON.stringify(response.data))
      }
    },
    async get_drawer_item () {
      const response = await api.get('comment/entry/' + this.drawer_item_id)
      if (response.data) {
        this.drawer_item = response.data
        await this.getDrawerComment()
      } else {
        this.$notify({
          title: '获取留言数据错误',
          type: 'warning',
          duration: 10000
        })
      }
    }
  },
  async mounted () {
    await this.get_drawer_item()
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
