
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
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">题库</el-menu-item>
    <el-menu-item index="3">比赛</el-menu-item>
    <div class="right" />
    <el-menu-item index="4" v-show=!uid>登录</el-menu-item>
    <el-menu-item index="5" v-show=!uid>注册</el-menu-item>
    <el-menu-item index="6" v-show=uid>{{ uid }}</el-menu-item>
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
  export default {
    name: 'OJHeader',
    components: {

    },
    methods: {
        example_function: function () {
        }
    },
    computed: {

    },
    data() {
        return {
            uid:"Irisu"
        }
    }
    , watch: {
        
    }
  }
</script>
