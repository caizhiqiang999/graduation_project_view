<template>
  <div>
    <div class="new">
      <div class="search">
        <el-input v-model="find" placeholder="搜索" class="search-item">
        </el-input>
        <i class="el-icon-search icon" @click="searchItem"></i>
      </div>
      <div class="content" v-for='(item, index) in data' :key='item.id'>
        <div class="avt">
          <el-avatar :size="40" :src='item.author.avatarUrl' class="avatar"></el-avatar>
          <span>{{item.author.nickname}}</span>
          <span class="time">{{item.createAt}}</span>
        </div>
        <h3 class="title">{{item.title}}</h3>
        <p v-html="item.content" @click="itemClick(index)" class="article" :class="{'ha': currentIndex != index }">{{item.content}}</p>
        <div class="comment">
          <div class="hover" @click="isShow(index)">
            <i class="el-icon-chat-dot-round bbb"></i>
            <span class="comm">{{item.commentCount}}</span>
          </div>
          <div class="hover">
            <i class="el-icon-thumb bbb" @click='praise(index)'></i>
            <span class="comm">{{data[index].praise}}</span>
          </div>
        </div>
        <div class="comme" :class="{'showss': showIndex != index}">
          <div class="comme-item">
            <el-avatar shape="square" :size="40" :src="squareUrl" class="zzz"></el-avatar>
            <el-input v-model="comment" placeholder="" class="lll"></el-input>
          </div>
          <el-button type="primary" class="ccc" @click="setComment(item.id)">评论</el-button>
          <div v-for="ite in item.comments" :key="ite.id" class="ddd">
            <div class="showcom">
              <el-avatar :size="40" :src="ite.user.avatarUrl" class="zzz"></el-avatar>
              <p class="nickn">{{ite.user.nickname}}：</p>
              <p class="conten">{{ite.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      find: '',
      data: [],
      time: '',
      currentIndex: -1,
      showIndex: -1,
      comment: '',
      squareUrl: window.sessionStorage.avatarUrl || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  created() {
    axios({
      url: 'http://localhost:8000/article?offset=0&size=100',
    }).then(res => {
      this.data = res.data
      for(let i = 0; i < this.data.length; i++) {
        const str = this.data[i].createAt.replace('T', ' ')
        const str1 = str.replace('.000Z', '')
        var reg = new RegExp('\n', 'g')
        this.data[i].content = this.data[i].content.replace(reg, '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
        this.data[i].createAt = str1
      }
    })
  },
  methods: {
    searchItem() {
      if(this.find.trim().length === 0) {
        this.$message.error('请输入要查询的内容')
        return
      }
      axios({
        url: 'http://localhost:8000/article/search',
        method: 'post',
        data: {
          find: '%' + this.find + '%'
        }
      }).then(res => {
        if(res.data.length === 0) {
          this.$message.error('未获取到任何结果')
          reutrn
        }
        console.log(res.data)
        this.$router.push({
          path: 'search',
          query: {
            find: res.data
          }
        })
      })
    },
    itemClick(index) {
      if(this.currentIndex != index) {
        this.currentIndex = index
      } else {
        this.currentIndex = -1
      }
    },
    isShow(index) {
      if(this.showIndex != index) {
        this.showIndex = index
      } else {
        this.showIndex = -1
      }
    },
    setComment(id) {
      if(this.comment.length === 0) {
        this.$message.error('评论内容不能为空')
        return
      }
      if(!window.sessionStorage.token) {
        this.$message.error('您还未登录')
        return
      }
      axios({
        url: 'http://localhost:8000/comment',
        method: 'post',
        data: {
          content: this.comment,
          articleId: id
        },
        headers: {'authorization': window.sessionStorage.token}
      }).then(res => {
        if(res) {
          this.$message.success('发表评论成功')
          this.comment = ''
          setTimeout(function() {
              location.reload()
            }, 1000)
        } else {
          this.$message.error('发表评论失败')
        }
      })
    },
    praise(index) {
      this.data[index].praise += 1
    }
  }
}
</script>

<style>
.new {
  width: 700px;
  margin-left: 80px;
}
.search {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px 0;
  background-color: transparent;
  border-radius: 20px;
  position: relative;
}
.search-item {
  display: block;
  width: 70%;
  margin: auto;
}
.icon {
  position: absolute;
  left: 78%;
  top: 30%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
}
.content {
  width: 100%;
  margin-bottom: 10px;
  /* background-color: rgb(240, 241, 241); */
  border-radius: 20px;
}
.avt {
  width: 660px;
  height: 40px;
  margin: auto;
  line-height: 40px;
  padding: 10px 0;
  margin-top: 20px;
  display: flex;
  border-bottom: 1px solid rgb(197, 196, 196);
}
.avatar {
  margin-right: 20px;
}
.time {
  font-size: 12px;
  color: rgb(160, 161, 161);
  margin-left: 400px;
}
.title {
  padding: 20px 0 10px 40px;
}
.article {
  width: 600px;
  padding: 10px 10px 0 10px;
  margin: 0 auto;
  line-height: 30px;
  /* background-color: rgb(221, 223, 223); */
}
.img {
  display: block;
  width: 550px;
  margin: 0 auto;
}
.ha {
  display: -webkit-box;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.zhan {
  font-size: 10px;
  padding: 10px 0;
  display: block;
  color: blue;
  text-align: center;
}
.comment {
  width: 600px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  padding-top: 10px;
  border-top: 1px solid rgb(197, 196, 196);
  display: flex;
  justify-content: space-around;
}
.comm {
  color: rgb(160, 161, 161);
  margin-left: 5px;
}
.bbb {
  font-size: 20px;
}
.hover {
  cursor: pointer;
}
.hover:hover {
  color: red;
}
.comme {
  width: 600px;
  margin: 0 auto;
  margin-top: 10px;
}
.comme-item {
  /* height: 60px;
  line-height: 60px; */
  display: flex;
}
.lll {
  margin-left: 10px;
}
.ccc {
  height: 30px;
  line-height: 0px;
  margin-top: 10px;
  margin-left: 530px;
}
.showcom {
  position: relative;
}
.nickn {
  font-size: 14px;
  color: rgb(133, 134, 134);
  position: absolute;
  top: 20%;
  left: 8%;
}
.conten {
  font-size: 14px;
  color: rgb(12, 14, 15);
  margin-left: 50px;
  text-indent: 2em;
  line-height: 26px;
}
.showss {
  display: none;
}
</style>