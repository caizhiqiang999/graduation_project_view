<template>
  <div>
    <transition name="el-zoom-in-center">
    <div class="login" v-if="!cShowLogin">
    <div class="content">
      <div class="content-item">
        <div v-for="(item, index) in loginMethods"
             :key="item"
             @click="loginMethodClick(index)"
             class="item-method"
             :class="{tabbar: currentIndex === index ? true : ''}">{{item}}</div>
        </div>
        <el-form label-position="right" label-width="60px" v-if='isShow'>
          <el-form-item label="手机号">
            <el-input v-model="telephone1" class="input-item"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" type="password" class="input-item"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-position="right" label-width="60px" v-else>
          <el-form-item label="手机号" class="el-form">
            <el-input v-model="telephone2" class="input-item item"></el-input>
            <el-button class="btn-item" size='small'>发送验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="code" class="input-item"></el-input>
          </el-form-item>
        </el-form>

        <el-button class="btn" type="primary" round @click="login">登录</el-button>
        <div class="tab-bar">
          <a href="" @click.prevent="regClick">立即注册</a>
          <a href="">忘记密码</a>
        </div>
      </div>
    </div>
  </transition>
  <transition>
  <div class="loginnner login" v-if="regIsShow">
      <div class="icon" @click="closeReg">
        <i class="el-icon-close close"></i>
      </div>
      <div class="reg-content content">
        <el-form label-position="right" label-width="70px">
          <el-form-item label="手机号" class="el-form addp">
            <el-input v-model="reg_telephone" class="input-item item"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="reg_password" type="password" class="input-item"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="reg_password1" type="password" class="input-item"></el-input>
          </el-form-item>
        </el-form>
        <el-button class="btn" type="primary" round @click="zhuce">注册</el-button>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
// import { getLogin } from '../../service/request.js'
import axios from 'axios'
import { mapMutations } from 'vuex'
export default {
  props: {
    showLogin: Boolean
  },
  data() {
    return {
      loginMethods: ['账号登录', '验证码登录'],
      currentIndex: 0,
      telephone1: '',
      telephone2: '',
      password: '',
      code: '',
      reg_telephone: '',
      reg_code: '',
      reg_password: '',
      reg_password1: '',
      cShowLogin: this.showLogin,
      isShow: true,
      regIsShow: false,
      isLogin: '注销'
    }
  },
  watch: {
    showLogin(newValue) {
      this.cShowLogin = newValue
    }
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    loginMethodClick(index) {
      if(this.currentIndex !== index) {
        this.isShow = !this.isShow
      }
      this.currentIndex = index
    },
    zhuce() {
      const telephone = /^1(3[0-9]|4[5,7]|5[0,1,2,3,4,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8,6]|8[0-9]|9[1,8,9])\d{8}$/
      if(this.reg_telephone.length == 0 || this.reg_password.length == 0 || this.reg_password1.length == 0) {
        this.$message.error('输入有误')
        return
      } else if(this.reg_password != this.reg_password1) {
        this.$message.error('密码确认失败')
        return
      } else if(!telephone.test(this.reg_telephone) || !this.reg_telephone.length == 11) {
        this.$message.error('输入的手机号不正确')
        return
      }

      axios({
        url: 'http://localhost:8000/users',
        method: 'post',
        data: {
          telephone: this.reg_telephone,
          password: this.reg_password
        }
      }).then(res => {
        this.$message.success('注册成功')
      }).catch(err => {
        this.$message.error('注册失败')
      })
    },
    regClick() {
      this.regIsShow = true
      this.cShowLogin = !this.cShowLogin
    },

    closeReg() {
      this.regIsShow = false
    },

    login() {
      if(this.telephone1.length == 0 || this.password.length == 0) {
        this.$message.error('字段不能为空')
      } else {
        axios({
        url: 'http://localhost:8000/login',
        method: 'post',
        data: {
          "telephone": this.telephone1,
          "password": this.password
        }
        }).then(res => {
          if(res.data.token) {
            this.cShowLogin = !this.cShowLogin
            window.sessionStorage.setItem('token', res.data.token)
            window.sessionStorage.setItem('nickname', res.data.nickname)
            window.sessionStorage.setItem('avatarUrl', res.data.avatar_url)

            this.$message.success('登录成功')
            this.SET_USERINFO(res.data)
            setTimeout(function() {
              location.reload()
            }, 1000)
          }
        }).catch(error => {
          console.log(error)
          this.$message.error('登录失败')
        })
      }
    }
  }
}
</script>

<style scoped>
.login {
  width: 400px;
  height: 400px;
  background-color: rgb(247, 245, 245);
  border-radius: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-200px, -200px);
}
.content {
  width: 300px;
  height: 300px;
  margin: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-150px, -150px);
}
.content-item {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
}
.item-method {
  height: 40px;
  flex: 1;
  text-align: center;
  line-height: 40px;
}
.tabbar {
  color: red;
  font-size: 20px;
}
.input-item {
  width: 220px;
}
.btn {
  display: block;
  width: 200px;
  margin: 30px auto;
}
.tab-bar {
  display: flex;
  justify-content: space-between;
}

.btn-item {
  height: 40px;
  text-align: center;
  background-color: rgb(184, 247, 228);
  border: none
}
.icon {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 360px;
  text-align: center;
  line-height: 40px;
  border-radius:0 30px 0 0;
}
.icon:hover {
  background-color: rgb(94, 95, 95);
  color: #fff;
}
.loginner {
  position: relative;
}
.addp {
  margin-top: 30px;
}
</style>