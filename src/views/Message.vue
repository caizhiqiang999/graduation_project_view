<template>
  <div class="message">
    <Transition v-if="!isShow"></Transition>
    <div v-else class="message-item">
      <el-form label-position="right" label-width="70px">
          <el-form-item label="昵称" class="el-form">
            <el-input v-model="nickname" class="input-item item"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              v-model="age"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="email" type="email" class="input-item"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:8000/upload/avatar"
              :headers="{'authorization': token}"
              :show-file-list="false"
              :on-success="handleAvatarSuccessp"
              >
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <i class="el-icon-plus avatar-uploader-icon"></i>上传附件
            </el-upload>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="upload" class="ti">提交</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Transition from '../components/components/Transition'
export default {
  components: {
    Transition
  },
  data() {
    return {
      isShow: false,
      nickname: '',
      age: '',
      email: '',
      token: window.sessionStorage.token || ''
    }
  },
  mounted() {
    if(window.sessionStorage.token) {
      this.isShow = !this.isShow
    }
  },
  methods: {
    handleAvatarSuccessp(res, file) {
      this.$message.success('头像上传成功')
    },
    upload() {
      const email = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
      if(!email.test(this.email)) {
        this.$message.error('邮箱输入有误')
        return
      }
      axios({
        url: 'http://localhost:8000/message',
        method: 'post',
        data: {
          nickname: this.nickname,
          age: this.age,
          email: this.email
        },
        headers: {'authorization': window.sessionStorage.token}
      }).then(res => {
        this.$message.success('完善信息成功')
        setTimeout(function() {
          location.reload()
        },800)
      }).catch(err => {
        this.$message.error('完善信息失败')
      })
    }
  }
}
</script>

<style>
.message {
  margin-left: 80px;
}
.message-item {
  margin-top: 40px;
}
.ti {
  width: 250px;
  margin-left: 30px;
}
</style>