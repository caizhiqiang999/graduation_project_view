<template>
  <div>
    <Transition v-if="!isShow"></Transition>
    <div v-else class="question">
      <div class="question-item" v-for='(item, index) in data' :key='item.id'>
        <div class="avt">
          <el-avatar :size="40" :src='item.author.avatarUrl' class="avatar"></el-avatar>
          <span class="nicknamep">{{item.author.nickname}}</span>
          <span class="time">{{item.createAt}}</span>
        </div>
        <h3 class="title">{{item.content}}</h3>
        <div class="hover" @click="isSShow(index)">
          <i class="el-icon-chat-dot-round bbb"></i>
          <span class="comm">已回答：{{item.answerCount}}</span>
        </div>
        <div class="comme" :class="{'showss': showIndex != index}">
          <div class="comme-item">
            <el-avatar shape="square" :size="40" :src="squareUrl" class="zzz"></el-avatar>
            <el-input v-model="comment" placeholder="" class="lll"></el-input>
          </div>
          <el-button type="primary" class="ccc" @click="setAnswer(item.id)">回答</el-button>
          <div v-for="ite in item.answer" :key="ite.id" class="ddd">
            <div class="showcom">
              <el-avatar :size="40" :src="ite.user.avatarUrl" class="zzz"></el-avatar>
              <span class="nickn">{{ite.user.nickname}}：</span>
              <p class="conten">{{ite.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Transition from '../components/components/Transition'
import axios from 'axios'
export default {
  data() {
    return {
      isShow: false,
      data: '',
      showIndex: -1,
      squareUrl: window.sessionStorage.avatarUrl || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      comment: ''
    }
  },
  methods: {
    isSShow(index) {
      if(this.showIndex != index) {
        this.showIndex = index
      } else {
        this.showIndex = -1
      }
    },
    setAnswer(id) {
      if(this.comment.length === 0) {
        this.$message.error('回答内容不能为空')
        return
      }
      axios({
        url: 'http://localhost:8000/question/item',
        method: 'post',
        data: {
          content: this.comment,
          questionId: id
        },
        headers: {'authorization': window.sessionStorage.token}
      }).then(res => {
        if(res) {
          this.$message.success('回答成功')
          this.comment = ''
          setTimeout(function() {
              location.reload()
            }, 1000)
        } else {
          this.$message.error('回答失败')
        }
      })
    }
  },
  mounted() {
    if(window.sessionStorage.token) {
      this.isShow = !this.isShow
    }
  },
  components: {
    Transition,
  },
  created() {
    axios({
      url: 'http://localhost:8000/question/answer?offset=0&size=100',
      headers: {'authorization': window.sessionStorage.token}
    }).then(res => {
      console.log(res)
      this.data = res.data
      for(let i = 0; i < this.data.length; i++) {
        const str = this.data[i].createAt.replace('T', ' ')
        const str1 = str.replace('.000Z', '')
        this.data[i].createAt = str1
      }
    })
  }
}
</script>

<style scoped>
.question {
  width: 700px;
  margin-left: 80px;
}
.question-item {
  width: 600px;
  margin: 0 auto;
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
  position: relative;
}
.avatar {
  margin-right: 20px;
}
.nicknamep {
  color: rgb(48, 47, 47);
  font-size: 14px;
}
.time {
  font-size: 12px;
  color: rgb(37, 37, 37);
  position: absolute;
  top: 20%;
  left: 80%;
}
.title {
  padding: 20px 0 20px 40px;
}
.bbb {
  font-size: 20px;
}
.hover {
  cursor: pointer;
}
.comm {
  color: rgb(40, 41, 41);
  margin-left: 5px;
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
  /* height: 60px; */
  /* line-height: 60px; */
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
  color: rgb(42, 43, 43);
  position: absolute;
  top: 25%;
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