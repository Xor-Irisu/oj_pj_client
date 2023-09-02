<template>
    <div class="TeamPage">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <Header/>
        <h2>我加入的团队</h2>
        <div class="button_container">
            <el-button type="primary" @click="jump()">创建团队</el-button>
        </div>
        <br/>
        <el-table :data="teamdata" style="width:100%">
        <el-table-column width="250px" prop="tId" label="队伍编号"></el-table-column>
        <el-table-column width="250px" prop="tName" label="队长名字"></el-table-column>
        <el-table-column width="250px" prop="tBrief" label="队伍描述"></el-table-column>
        <el-table-column width="250px" prop="tType" label="角色"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name:'TeamPage',
        data(){
            return{
                server_url: "http://127.0.0.1:3000",
                teamdata:[],
            }
        },
        methods:{
            jump() {
                this.$router.push({
                    path:'/createteam'
                })
            }
        },
        created(){
            var that=this
            axios.post(that.server_url+'/team/myteam')
                .then(function(response){
                    that.teamdata=response.data;
                })
                .catch(function(error){
                    console.log(error);
                    alert("获取失败");
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
