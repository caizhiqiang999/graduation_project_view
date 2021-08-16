<template>
  <div>
    <Transition v-if="!isShow"></Transition>
    <div v-else class="new">
      <div class="content" v-for='(item, index) in data' :key='item.id'>
        <h3 class="title">{{item.title}}</h3>
        <p v-html="item.content" @click="itemInClick(index)" class="article" :class="{'ha': currentIndex != index }">{{item.content}}</p>
        <el-button type="primary" class="btn" @click='delect(item.id)'>删除文章</el-button>
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
      currentIndex: -1
    }
  },
  created() {
    axios({
      url: 'http://localhost:8000/article/user',
      headers: {'authorization': window.sessionStorage.token}
    }).then(res => {
      console.log(res.data)
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
    itemInClick(index) {
      if(this.currentIndex != index) {
        this.currentIndex = index
      } else {
        this.currentIndex = -1
      }
    },
    delect(id) {
      axios({
        url: 'http://localhost:8000/article/' + id,
        method: 'post',
        headers: {'authorization': window.sessionStorage.token}
      }).then(res => {
        if(res) {
          this.$message.success('删除文章成功')
          setTimeout(function() {
              location.reload()
            }, 1000)
        } else {
          this.$message.error('删除文章失败')
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
  }
}
</script>

<style>
.zhan {
  font-size: 10px;
  margin-top: 20px;
  padding: 10px 0;
  display: block;
  color: blue;
  text-align: center;
}
.new {
  width: 700px;
  margin-left: 80px;
}
.content {
  width: 100%;
  margin-bottom: 10px;
  /* background-color: rgb(240, 241, 241); */
  border-radius: 20px;
  line-height: 20px;
}
.avt {
  width: 660px;
  height: 40px;
  margin: auto;
  line-height: 40px;
  padding: 10px 0;
  margin-top: 20px;
  display: flex;
  /* border-bottom: 1px solid rgb(197, 196, 196); */
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
  padding: 10px 0 10px 40px;
}
.ha {
  display: -webkit-box;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
}
.article {
  width: 600px;
  padding: 10px 10px 0 10px;
  margin: 0 auto;
  /* background-color: rgb(221, 223, 223); */
}
.img {
  display: block;
  width: 600px;
  margin: 0 auto;
}
.btn {
  margin-top: 20px;
  width: 600px;
  margin-left: 50px;
}
</style>