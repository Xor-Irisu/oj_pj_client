<template>
    <div class="TeamPage">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <Header/>
        <h2>可加入团队</h2>
        <br/>
        <div class="button_container">
            <el-button type="primary" @click="jump()">返回</el-button>
        </div>
        <br/>
        <el-table :data="teamdata" style="width:100%" border stripe>
        <el-table-column width="250px" prop="tId" label="编号"></el-table-column>
        <el-table-column width="250px" prop="tName" label="队长名字"></el-table-column>
        <el-table-column width="250px" prop="tBrief" label="队伍描述"></el-table-column>
        <el-table-column width="250px" prop="tType" label="操作">
            <template #default="scope">
                <el-button type="primary" @click="applyteam(scope.row.tName)">申请加入</el-button>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import axios from 'axios'
    import Header from '@/components/OJHeader.vue'
    import global from '@/components/VueCommon.vue';
    export default {
        name:'TeamPage',
        components: {
            Header,
        },
        data(){
            return{
                server_url: "http://127.0.0.1:3000",
                teamdata:[],
                uId:"",
                utoken:""
            }
        },
        methods:{
            jump() {
                this.$router.back();
            },
            applyteam(tName){
                var that=this
                var formData = new URLSearchParams();
                this.uId=localStorage.getItem('uId');
                formData.append('tName', tName);//可以这样存放要post的信息
                formData.append('uId', that.uId);//可以这样存放要post的信息
                axios.post(that.server_url+'/team/applyteam',formData)
                 .then(function(response){
                        alert("申请成功");
                        that.$router.back();
                    })
                    .catch(function(error){
                        alert("error");
                        console.log(error);
                    });   
            }
        },
        created(){
            var that=this
            this.uId=localStorage.getItem('uId');
            var formData = new URLSearchParams();
            formData.append('uId', that.uId);//可以这样存放要post的信息
            axios.post(that.server_url+'/team/allteam',formData)
                .then(function(response){
                    that.teamdata=response.data;
                })
                .catch(function(error){
                    console.log(error);
                });           
        }
    }
</script>