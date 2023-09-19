<template>
    <div class="CreateTeamView">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <Header/>
        <div class="create">
            <h1>团队名称：</h1>
            <input type="text" value="" placeholder="请输入团队名称" ref="tName">
            <h1>团队介绍：</h1>
            <!-- <input type="textarea" :row="2" value="" placeholder="请输入团队介绍" ref="tBrief"
            style="height:500px;width:200px;"> -->
            <el-input type="textarea" :rows="20" placeholder="请输入团队介绍" v-model="tBrief"
            maxlength="200" show-word-limit>
            </el-input>
            <br/><br/><br/><br/>
            <input type="checkbox" id="check" v-model="is_checked">
            <label for="check">我已确认所有信息准确无误</label>
            <br/><br/>
            <br/><br/><br/><br/>
            <el-button type="success" @click="create_function">创建团队</el-button>
        </div>
        <div class="notice">
            <h1>创建团队</h1>
            <span>已经创建的团队无法删除，您作为团队主也无法退出。请思考好再创建。
                请勿在洛谷站内公开场合、或通过私信群发陌生人等方式宣传团队，将被认为是垃圾广告而删除。
                如果您的团队中出现违反国家法律法规、公序良俗的公开信息，则您可能需要对此类内容负责任。
                出现下面任一情况，团队将被管理员封禁。
                假冒其他团队、或使用与其他团队类似的名字的；
                团队发生对其他团队、个人侮辱、诽谤的；
                其他管理员认为可能造成危害的情况。</span>
        </div>
        <div class="img">
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Header from '@/components/OJHeader.vue'
    import global from '@/components/VueCommon.vue';
  export default {
    name: 'CreateTeamView',
    components: {
        Header,
    },
    data(){
        return{
            server_url: "http://127.0.0.1:3000",
            tName:"",
            tBrief:"",
            is_checked:false,
            uId:"",
            utoken:""
        }
    },
    methods: {
        create_function: function(){
            this.tName=this.$refs.tName.value;
            //this.tBrief=this.$refs.tBrief.value;
            this.uId=localStorage.getItem('uId');
            this.utoken=localStorage.getItem('uId_token');
            if(this.tName=="")alert("请输入团队名称");
            else if(this.tBrief=="")alert("请输入团队介绍");
            else if(this.is_checked==false)alert("请勾选确认框");
            else{var that=this 
                axios.post(that.server_url+'/team/createteam',
                {tName:this.tName,
                 tBrief:this.tBrief,
                 uId:this.uId,
                 utoken:this.utoken
                })
                .then(function(response){
                    console.log(response);
                    alert("创建成功");
                    that.$router.back();
                })
                .catch(function(error){
                    alert("失败");
                    console.log(error);
                    that.$router.push({
                        path:'/team'
                    })
                });
            }
        }
    }
  }
</script>
<style>
    .CreateTeamView{
        margin-left: 0px;
        margin-top: 0px;
    }
    .create{
        background-color:aliceblue;
        width: 45%;
        height:100%;
        position:relative;
    }
    .notice{
        background-color:aliceblue;
        position:relative;
        width: 50%;
        margin-left: 50%;
        margin-top: -65%;
        height:50%;
        text-align: center;
    }
    .img{
        background-color:aliceblue;
        position:relative;
        width: 50%;
        margin-left: 50%;
        margin-top: 5%;
        height:600px;
        text-align: center;
        background-image: url('E:\vpn\workspace\oj_pj_client\src\assets\logo.png');
    }
</style>