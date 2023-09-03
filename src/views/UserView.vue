<template>
    <div class="MainPage">
        <OJHeader/>
        <div v-if="uId">
        <div id="UserHeader" :style="{backgroundImage:'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4)),url(' + uTitle + ')'}">
            <div id="userpic" :style="{backgroundImage: 'url(' + uHead + ')'}"></div>
            <div id="HeaderText">
                <el-text id="NameText" :style="{opacity:1}">{{ uName }}@{{uId}}</el-text><br/><br/>
                <el-text id="IntroText">{{ uIntro }}</el-text>
            </div>
            <el-text id="EmailText">Email: {{ uEmail }}</el-text>
            <el-text id="QQText">QQ: {{ uQQ }}</el-text>
        </div>
        <div class="UserInfo">
            <div id="InfoHeader">
                <el-text id="InfoHeaderText">个人介绍</el-text>
                <el-button id="InfoButton" @click="edit" v-if="uId==myId">{{ editText }}</el-button>
            </div>
            <MarkdownBox :msg="uInfo" v-if="!EditMode"></MarkdownBox>
            <el-input v-model="uInfo" v-if="EditMode" type="textarea" id="editBox" :autosize="{ minRows: 50, maxRows: 4000 }" :resize="none"></el-input>
        </div>
        <div class="InfoEditRight" v-if="EditMode">
           <el-text class="EditItem">昵称:</el-text><br/><el-input v-model="uName" class="ItemBox"></el-input><br/>
           <el-text class="EditItem">签名:</el-text><br/><el-input v-model="uIntro" class="ItemBox"></el-input><br/>
            <el-text class="EditItem">QQ:</el-text><br/><el-input v-model="uQQ" class="ItemBox"></el-input><br/>
            <el-text class="EditItem">Email:</el-text><br/><el-input v-model="uEmail" class="ItemBox"></el-input><br/>
            <el-text class="EditItem">名片地址:</el-text><br/><el-input v-model="uTitle" class="ItemBox"></el-input><br/>
            <el-text class="EditItem">头像地址:</el-text><br/><el-input v-model="uHead" class="ItemBox"></el-input>
        </div>
        </div>
    </div>
</template>
<style>
    .MainPage{
        margin-left:5%;
        margin-right:5%;
        background:#F4F5F7;
        height:auto;
        padding-bottom:100px;
    }
    .MainPage .InfoEditRight .EditItem{
        font-weight: bold;
        font-size:15px;
        margin-top:5px;
        margin-bottom:5px;
        margin-left:10px;
    }
    .MainPage .InfoEditRight .ItemBox{
        margin-top:5px;
        margin-bottom:5px;
        margin-left:10px;
        width:80%;
    }
    .MainPage .UserInfo #InfoHeader{
        margin-top:15px;
    }
    .MainPage .UserInfo #editBox{
        margin-top:20px;
        height:auto;
    }
    .MainPage .UserInfo #InfoButton{
        margin:0px;
        display: block;
        float:right;
        color:#409EFF;
        border-color: #409EFF;
    }
    .MainPage .UserInfo #InfoHeader #InfoHeaderText{
        font-size:18px;
        font-weight: bold;
        color:#000000;
    }
    .MainPage .UserInfo{
        display: inline-block;
        color: var(--el-text-color-primary);
        font-size: 16px;
        border: 1px solid var(--el-border-color);
        border-radius: 10px;
        margin-left:6%;
        width:58%;
        margin-top:30px;
        padding:0px;
        padding-left:20px;
        padding-right:20px;
        padding-top:5px;
        background: #FFFFFF;
        padding-bottom:100px;
    }
    .MainPage .InfoEditRight{
        float:right;
        color: var(--el-text-color-primary);
        font-size: 16px;
        border: 1px solid var(--el-border-color);
        border-radius: 10px;
        margin-right:6%;
        width:25%;
        margin-top:30px;
        padding:0px;
        padding-left:0px;
        padding-right:0px;
        padding-top:20px;
        background: #FFFFFF;
        padding-bottom:100px;
        
    }
    .MainPage #UserHeader{
        color: #FFFFFF;
        font-size: 16px;
        border: 1px rgba(0,0,0,0.5);
        border-radius: 10px;
        height:100px;
        padding-top:150px;
        margin-left:6%;
        margin-right:6%;
        margin-top:30px;
        background-position:center;
    }
    
    .MainPage #userpic{
        float:left;
        width:60px;
        height:60px;
        margin-top:10px;
        margin-left:30px;
        
        color: var(--el-text-color-primary);
        font-size: 16px;
        border-radius: 40px;
        display: block;
        background-size:100% 100%;
    }
    .MainPage #HeaderText{
        padding-top:12px;
        float:left;
        margin-left:10px;
    }
    .MainPage #UserHeader #NameText{
        color: #FFFFFF;
        float:left;
        margin:0px;
        font-size: 25px;
        display: block;
    }
    .MainPage #UserHeader #IntroText{
        color: #FFFFFF;
        float:left;
        margin:0px;
        font-size: 15px;
        display: block;
    }
    .MainPage #UserHeader #QQText{
        color: #FFFFFF;
        float:right;
        margin:0px;
        font-size: 15px;
        display: block;
        margin-top:53px;
        margin-right:50px;
    }
    .MainPage #UserHeader #EmailText{
        color: #FFFFFF;
        float:right;
        margin:0px;
        font-size: 15px;
        display: block;
        margin-top:53px;
        margin-right:50px;
    }
</style>
<script>
import axios from 'axios'
import OJHeader from '@/components/OJHeader.vue'
import MarkdownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
  export default {
    name: 'UserView',
    mounted: function () {
        var query = this.$route.query;
        if ("uId" in localStorage)
        this.myId=localStorage.getItem("uId")
        var sId = "";
        sId = query.uId;
        this.uId = sId;
        var that=this
        var url = this.server_url

        var formData = new URLSearchParams();
        formData.append('uId', that.uId);//可以这样存放要post的信息
        axios.post(url+'/users/info',formData)                             //放数据的接口
        .then(function (response) {                         //收到的数据
            console.log(response.data);                    //response就是返回数据
            that.uId = response.data.uId;
            that.uName = response.data.uName;
            that.uIntro = response.data.uIntro;
            that.uInfo=response.data.uInfo
            that.uRank = response.data.uRank;
            that.uRating = response.data.uRating;
            that.uQQ = response.data.uQQ;
            that.uEmail = response.data.uEmail;
            that.uAttention = response.data.uAttention;
            that.uTitle = response.data.uTitle;
            that.uHead = response.data.uHead;
            if(that.uIntro==0)that.uIntro="暂无个人签名"
            if (that.uInfo == 0) that.uInfo = "暂无个人介绍"
            if (that.uTitle == 0) that.uTitle = "http://uprprc.club/wp-content/uploads/2023/09/2222.png"
            if(that.uHead==0)that.uHead="http://uprprc.club/wp-content/uploads/2023/09/头像.png"
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    components: {
        OJHeader,
        MarkdownBox
    },
    
    methods: {
        edit: function () {
            this.EditMode = !this.EditMode
            if (this.EditMode == false) {
                this.editText = "编辑资料"
                var that=this
                var url = this.server_url
                var formData = new URLSearchParams();
                formData.append('uId_token',localStorage.getItem('uId_token'))
                formData.append('uId', that.uId);//可以这样存放要post的信息
                formData.append('uInfo', that.uInfo)
                formData.append('uName', that.uName)
                formData.append('uIntro', that.uIntro)
                formData.append('uQQ', that.uQQ);
                formData.append('uEmail', that.uEmail);
                formData.append('uTitle', that.uTitle);
                formData.append('uHead', that.uHead);
                axios.post(url+'/users/editinfo',formData)
                .then(function (response) {
                    console.log(response.data);
                    if (response.data.message == "token错误") {
                        global.clear_info()
                        location.reload()
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
            else this.editText="保存"
        }
    },
    computed: {

    },
    data() {
        return {
            server_url: global.serverUrl,
            uId: "",
            uName: "",
            uIntro: "",
            uInfo: "",
            uRank: "",
            uRating: "",
            uQQ: "",
            uEmail: "",
            uAttention: "",
            uTitle: "",
            uHead: "",
            myId:"",
            editText:"编辑资料",
            EditMode:false
        }
    }
    , watch: {
        '$route.query.uId'() {
            location.reload();
        }
    }
  }
</script>
