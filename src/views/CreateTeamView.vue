<template>
    <div class="CreateTeamView">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <Header/>
        <h1>团队名称：</h1>
        <input type="text" value="" placeholder="请输入团队名称" ref="tName">
        <h1>团队介绍：</h1>
        <input type="text" value="" placeholder="请输入团队介绍" ref="tBrief"
        style="height=500px;width=200px;">
        <br/><br/><br/><br/>
        <input type="checkbox" id="check" v-model="is_checked">
        <label for="check">我已确认所有信息准确无误</label>
        <br/><br/>
        <br/><br/><br/><br/>
        <el-button type="success" @click="create_function">创建团队</el-button>
    </div>
</template>
<script>
    import axios from 'axios'
  export default {
    name: 'CreateTeamView',
    data(){
        return{
            server_url: "http://127.0.0.1:3000",
            tName:"",
            tBrief:"",
            is_checked:false
        }
    },
    methods: {
        create_function: function(){
            this.tName=this.$refs.tName.value;
            this.tBrief=this.$refs.tBrief.value;
            if(this.tName=="")alert("请输入团队名称");
            else if(this.tBrief=="")alert("请输入团队介绍");
            else if(this.is_checked==false)alert("请勾选确认框");
            else{var that=this 
                axios.post(that.server_url+'/team/createteam',
                {tName:this.tName,
                 tBrief:this.tBrief   
                })
                .then(function(response){
                    console.log(response);
                    alert("创建成功");
                    that.$router.push({
                        path:'/team'
                    })
                })
                .catch(function(error){
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
        margin-left: 500px;
        margin-top: 200px;
    }
</style>