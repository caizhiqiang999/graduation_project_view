<template>
  <div class="con">
    <Transition v-if="!isShow"></Transition>
    <div v-else class="write"> 
      <h3 class="title">标题:</h3>
      <el-input v-model="title" placeholder="请输入标题"></el-input>
      <h3 class="title">创作文章:</h3>
      <textarea name="" id="" cols="85" rows="25" v-model='content' class="text"></textarea>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8000/upload/picture"
        :headers="{'authorization': token}"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
        <i class="el-icon-plus avatar-uploader-icon"></i>上传附件
      </el-upload>
      <el-button type="primary" class="btntt" @click="submit">提交创作</el-button>
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
      title: '',
      content: '',
      token: window.sessionStorage.token
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
    submit() {
      if(this.title.length === 0 || this.content.length === 0) {
        this.$message.error('内容或标题不能为空')
        return
      }

      axios({
        url: 'http://localhost:8000/article',
        method: 'post',
        data: {
          title: this.title,
          content: this.content
        },
        headers: {'authorization': window.sessionStorage.token}
      }).then(res => {
        if(res) {
          this.$message.success('提交成功')
          this.content = ''
          this.title = ''
          setTimeout(function() {
            location.reload()
          },700)
        } else {
          this.$message.error('提交失败')
        }
        
      })
    },
    handleAvatarSuccess(res, file) {
      this.$message.success('附件上传成功')
      this.content = this.content + res
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      return file;
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  margin: 10px 0;
}
.con {
  width: 900px;
}
.write {
  width: 700px;
  margin: 0 auto;
}
.title {
  margin: 20px 0;
}
.btntt {
  margin-top: 10px;
  width: 700px;
}
.text {
  border: 1px solid rgb(223, 223, 223);
}
</style>