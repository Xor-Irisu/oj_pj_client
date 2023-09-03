
<template>
  <div class="MainPage">
      <OJHeader/>
      <div class="LoginBox">
        <el-input v-model="uId" placeholder="账号" class="InputBox"/><br>
        <el-input v-model="uPw" placeholder="密码" class="InputBox"/><br>
        <el-button  type="primary" class="Button" @click="login">登录</el-button>
      </div>
  </div>
</template>
<style>
  .MainPage{
      margin-top:20px;
      margin-left:5%;
      margin-right:5%;
  }
  .LoginBox{
    padding-top:20px;
    padding-bottom:20px;
    color: var(--el-text-color-primary);
    font-size: 16px;
    margin-left:auto;
    margin-right:auto;
    text-align: center;
    width:400px;
    border: 3px solid var(--el-border-color);
    border-radius: 20px;
    margin-top: 200px;
  }
  .LoginBox .InputBox{
    width:200px;
    margin-left:auto;
    margin-right:auto;
    margin-top:20px;
  }
  .LoginBox .Button{
    width:50px;
    margin-left:auto;
    margin-right:auto;
    margin-top:20px;
  }
</style>
<script>

  import axios from 'axios'
import OJHeader from '@/components/OJHeader.vue'
import global from '@/components/VueCommon.vue';
  export default {
    name: 'LoginView',
    components: {
      OJHeader,
    },
  methods: {
    login2: function () {
        if('uId' in localStorage)
          this.uId=localStorage.getItem('uId');
      },
      login: function () {
        console.log(localStorage.getItem('uId'));
        var that=this
        var formData = new URLSearchParams();
        formData.append('uId', that.uId);//可以这样存放要post的信息
        formData.append('uPw', that.uPw);//可以这样存放要post的信息
        axios.post(that.server_url+'/users/login',formData)                             //放数据的接口
        .then(function (response) {                         //收到的数据
          console.log(response);                    //response就是返回数据
          if (response.data.message == "登入成功") {
            localStorage.setItem('uId_token', response.data.token)
            localStorage.setItem('uId', that.uId)
            that.$router.back()
            
          }
          else {
            that.msg=response.data.message
          }
        })
        .catch(function (error) {
            console.log(error);
        });
      }
    },
    computed: {
    },
    data() {
      return {
        uId: "",
        uPw: "",
        msg:"",
        server_url:global.serverUrl
      }
    }
    , watch: {
        
    }
  }
</script>
