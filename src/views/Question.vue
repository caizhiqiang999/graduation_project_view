<template>
  <div class="con">
    <Transition v-if="!isShow"></Transition>
    <div v-else class="write">
      <h4 class="title">问题描述~:</h4>
      <textarea name="" id="" cols="85" rows="30" v-model='content' class="text"></textarea>
      <el-button type="primary" class="btnp" @click="subMit">提交问题</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Transition from '../components/components/Transition'
export default {
  data() {
    return {
      isShow: false,
      content: ''
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
  methods: {
    subMit() {
      if(this.content.length === 0) {
        this.$message.error('提交问题失败')
      } else {
       axios({
        url: 'http://localhost:8000/question',
        method: 'post',
        data: {
          content: this.content
        },
        headers: {'authorization': window.sessionStorage.token}
      }).then(res => {
        if(res) {
          this.$message.success('提交成功')
          setTimeout(function() {
              location.reload()
            }, 1000)
        } else {
          this.$message.error('提交失败')
        }
      })
      }
    }
  }
}
</script>

<style scoped>
.con {
  width: 900px;
}
.write {
  width: 700px;
  margin: 0 auto;
}
.title {
  margin: 20px 0;
  color: rgb(213, 214, 214);
}
.btnp {
  margin-top: 20px;
  width: 700px;
}
.text {
  border: 1px solid rgb(161, 161, 161);
}
</style>