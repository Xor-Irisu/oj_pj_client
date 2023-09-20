
<template>
    <el-menu
    :default-active="activeIndex1"
    class="Header"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#fff"
    :ellipsis="false"
  >
    <el-menu-item index="1" @click="toHome">首页</el-menu-item>
    <el-menu-item index="2">题库</el-menu-item>
    <el-menu-item index="3">比赛</el-menu-item>
    <el-menu-item index="3">队伍</el-menu-item>
    <div class="right" />
    <el-menu-item index="4" v-show=!uid @click="toLogin">登录</el-menu-item>
    <el-menu-item index="5" v-show=!uid @click="toRegister">注册</el-menu-item>
    <el-sub-menu index="6" v-show=uid>
      <template #title>{{ uid }}</template>
      <el-menu-item index="6-1" @click="info">个人信息</el-menu-item>
      <el-menu-item index="6-1">我的团队</el-menu-item>
      <el-menu-item index="6-1">私信</el-menu-item>
      <el-menu-item index="6-2" @click="logout">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<style>
    .Header {
        height:50px;
    }
    .Header .right{
        flex-grow: 1;
    }
</style>
<script>
  import global from './VueCommon.vue';
  export default {
    name: 'OJHeader',
    components: {

  },
  mounted: function () {
      if('uId' in localStorage)this.uid=localStorage.getItem('uId')
  },
  methods: {
    example_function: function () {
    },
    logout: function () {
      localStorage.removeItem('uId')
      localStorage.removeItem('uId_token')
      this.uid = ""
      location.reload();
    },
    info: function () {
      this.$router.push('/')
      this.$router.push('/UserInfo' + '?uId=' + this.uid)
      window.location.href = global.httpUrl + '/UserInfo?uId=' + this.uid
    },
    toHome: function () {
      this.$router.push('/')
    },
    toLogin: function () {
      this.$router.push('/login')
    },
    toRegister: function () {
      this.$router.push('/register')
    }
  },
  computed: {
  },
  data() {
      return {
          uid:""
      }
   }
  , watch: {
       
  }
}
</script>



