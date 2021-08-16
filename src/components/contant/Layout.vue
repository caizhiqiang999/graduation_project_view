<template>
  <div class="wrap-v2 contant">
    <div class="left">
      <LeftLayout @showLogin='showLogin' class="block"></LeftLayout>
    </div>
    <div class="right">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <Login :showLogin='isShow'></Login>
  </div>
</template>

<script>
import LeftLayout from '../../views/LeftLayout'
import Login from '../components/Login'
export default {
  data() {
    return {
      isShow: true,
    }
  },
  components: {
    LeftLayout,
    Login
  },
  methods: {
    showLogin(showLogin) {
      this.isShow = showLogin
    }
  }

}
</script>

<style scoped>
.contant {
  display: flex;
  height: 1000px;
}

.left {
  height: 100%;
  width: 200px;
  /* border-right: 1px solid rgb(189, 188, 188); */
}
.right {
  margin-left: 20px;
  overflow: auto;
}
</style>