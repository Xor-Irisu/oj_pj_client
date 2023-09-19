<template>
    <div class="TeamPage">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <Header/>
        <h2>我加入的团队</h2>
        <div class="button_container">
            <el-button type="primary" @click="jump()">创建团队</el-button>
        </div>
        <br/>
        <el-table :data="teamdata" style="width:100%" border stripe>
        <el-table-column width="250px" prop="tId" label="队伍编号"></el-table-column>
        <el-table-column width="250px" prop="tName" label="队长名字"></el-table-column>
        <el-table-column width="250px" prop="tBrief" label="队伍描述"></el-table-column>
        <el-table-column width="250px" prop="tType" label="角色"></el-table-column>
        <el-table-column width="250px" prop="tType" label="操作">
            <template #default="scope">
                <el-button v-if="scope.row.tType==='队长'" type="danger" @click="deleteteam(scope.row.tName)">解散团队</el-button>
                <el-button v-if="scope.row.tType==='成员'" type="danger" @click="quitteam(scope.row.tName)">退出团队</el-button>
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
                this.$router.push({
                    path:'/createteam'
                })
            },
            deleteteam(tName) {
                var that=this
                var formData = new URLSearchParams();
                this.uId=localStorage.getItem('uId');
                this.utoken=localStorage.getItem('uId_token');
                formData.append('tName', tName);//可以这样存放要post的信息
                formData.append('uId', that.uId);//可以这样存放要post的信息
                formData.append('utoken', that.utoken);//可以这样存放要post的信息
                axios.post(that.server_url+'/team/deleteteam',formData)
                 .then(function(response){
                        if (response.data.message == "token错误") {
                            global.clear_info()
                            location.reload()
                        }
                        else{
                            alert("删除成功");
                            location.reload()
                        }
                    })
                    .catch(function(error){
                        alert("error");
                        console.log(error);
                    });           
            },
            quitteam(tName) {
                var that=this
                var formData = new URLSearchParams();
                this.uId=localStorage.getItem('uId');
                this.utoken=localStorage.getItem('uId_token');
                formData.append('tName', tName);//可以这样存放要post的信息
                formData.append('uId', that.uId);//可以这样存放要post的信息
                formData.append('utoken', that.utoken);//可以这样存放要post的信息
                axios.post(that.server_url+'/team/quitteam',formData)
                 .then(function(response){
                        if (response.data.message == "token错误") {
                            global.clear_info()
                            location.reload()
                        }
                        else{
                            alert("退出成功");
                            location.reload()
                        }
                    })
                    .catch(function(error){
                        alert("error");
                        console.log(error);
                    });           
            },
        },
        created(){
            var that=this
            this.uId=localStorage.getItem('uId');
            var formData = new URLSearchParams();
            formData.append('uId', that.uId);//可以这样存放要post的信息
            axios.post(that.server_url+'/team/myteam',formData)
                .then(function(response){
                    that.teamdata=response.data;
                })
                .catch(function(error){
                    console.log(error);
                });           
            console.log(this.teamdata);
        }
    }
</script>
<style>
.button_container{
    position: relative;
    display: flex;
    justify-content: flex-end;
}
</style>
