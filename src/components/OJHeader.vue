
<template>
  <el-menu :default-active="activeIndex1" class="Header" mode="horizontal" background-color="#545c64" text-color="#fff"
    active-text-color="#fff" :ellipsis="false">
    <el-menu-item index="1" @click="toPage('')">首页</el-menu-item>
    <el-menu-item index="2" @click="toPage('problems')">题库</el-menu-item>
    <el-menu-item index="3">比赛</el-menu-item>
    <el-menu-item index="3">队伍</el-menu-item>
    <el-menu-item index="4" @click="toPage('passages')">讨论板</el-menu-item>
    <div class="right" />
    <el-menu-item index="4" v-show=!uid @click="toPage('login')">登录</el-menu-item>
    <el-menu-item index="5" v-show=!uid @click="toPage('register')">注册</el-menu-item>
    <el-sub-menu index="6" v-show=uid>
      <template #title>{{ uid }}</template>
      <el-menu-item index="6-1" @click="toPage(`UserInfo?uId=${this.uid}`)">个人信息</el-menu-item>
      <el-menu-item index="6-2">我的团队</el-menu-item>
      <el-menu-item index="6-3">私信</el-menu-item>
      <el-menu-item index="6-4" @click="logout">登出</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<style>
.Header {
  height: 50px;
}

.Header .right {
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
    if ('uId' in localStorage) {
      this.uid = localStorage.getItem('uId')
      this.uRank = localStorage.getItem('uRank')
    }
  },
  methods: {
    example_function: function () {
    },
    logout: function () {
      global.clear_info()
      location.reload();
    },
    toPage: function (value) {
      this.$router.push(`/${value}`)
    }
  },
  computed: {
  },
  data() {
    return {
      uid: "",
      uRank: ""
    }
  }
  , watch: {

  }
}
</script>



