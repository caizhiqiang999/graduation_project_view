<template>
  <div class="nav">
    <div class="top">
      <div class="avte">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
        <p class="nickname">{{userInfo.nickname || '未登录~'}}</p>
      </div>
      <el-button type="primary" class="login" @click="showLogin">{{login}}</el-button>
    </div>
    <div class="bottom">
      <router-link class="link-item" to='/new' tag="div">最新创造</router-link>
      <router-link class="link-item" to='/mycreation' tag="div">我要创作</router-link>
      <router-link class="link-item" to='/record' tag="div">创作记录</router-link>
      <router-link class="link-item" to='/question' tag="div">我要提问</router-link>
      <router-link class="link-item" to='/answer' tag="div">我要回答</router-link>
      <router-link class="link-item" to='/message' tag="div">完善信息</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
  data() {
    return {
      circleUrl: window.sessionStorage.avatarUrl || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isShow: false,
      login: '登录',
    }
  },
  created() {
    console.log(window.sessionStorage.token)
    if(window.sessionStorage.getItem('token')) {
      this.login = '注销'
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    showLogin() {
      if(this.login === '登录') {
        this.isShow = !this.isShow
        this.$emit('showLogin', !this.isShow)
      } else {
        window.sessionStorage.clear()
        this.login = '登录'
        location.reload()
      }
    }
  }
}
</script>

<style scoped>
.nav {
  height: 100%;
  width: 280px;
}
.top {
  width: 200px;
  margin: 0 auto;
  border-bottom: 1px solid rgb(204, 204, 204);
}
.avte {
  height: 50px;
  line-height: 50px;
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
}
.nickname {
  color: rgb(151, 151, 151);
  font-family:unset;
}
.login {
  width: 100px;
  height: 30px;
  line-height: 0;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  display: block;
}
.bottom {
  width: 170px;
  margin: 0 auto;
}
.link-item {
  color: rgb(8, 8, 8);
  height: 30px;
  width: 150px;
  margin: 0 auto;
  line-height: 30px;
  text-align: center;
  border-radius: 30px;
  margin-top: 15px;
  box-shadow: 0 4px 2px rgb(51, 50, 50);
}
.link-item:hover, .router-link-active {
  height: 50px;
  width: 170px;
  line-height: 50px;
  text-align: center;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 1000;
  box-shadow: 0 3px 3px rgb(190, 40, 40);
  transition: all 0.2s;
}
</style>