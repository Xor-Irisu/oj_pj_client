<template>
    <div class="TeamPage">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <Header/>
        <h2>申请列表</h2>
        <br/>
        <div class="button_container">
            <el-button type="primary" @click="jump()">返回</el-button>
        </div>
        <br/>
        <el-table :data="teamdata" style="width:100%" border stripe>
        <el-table-column width="250px" prop="uId" label="申请人"></el-table-column>
        <el-table-column width="250px" prop="tName" label="申请队伍名称"></el-table-column>
        <el-table-column width="250px" prop="tType" label="操作">
            <template #default="scope">
                <el-button type="success" @click="yes(scope.row)">同意</el-button>
                <el-button type="danger" @click="no(scope.row)">拒绝</el-button>
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
                utoken:"",
            }
        },
        methods:{
            jump() {
                this.$router.back();
            },
            yes(row){
                var that=this
                var formData = new URLSearchParams();
                const id=row.uId;
                const tName=row.tName;
                formData.append('tName', tName);//可以这样存放要post的信息
                formData.append('uId', id);//可以这样存放要post的信息
                axios.post(that.server_url+'/team/yes',formData)
                 .then(function(response){
                        alert("审批成功");
                        location.reload()
                    })
                    .catch(function(error){
                        alert("error");
                        console.log(error);
                    });   
            },
            no(row){
                var that=this
                var formData = new URLSearchParams();
                const id=row.uId;
                const tName=row.tName;
                formData.append('tName', tName);//可以这样存放要post的信息
                formData.append('uId', id);//可以这样存放要post的信息
                axios.post(that.server_url+'/team/no',formData)
                 .then(function(response){
                        alert("审批成功");
                        location.reload()
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
            axios.post(that.server_url+'/team/allapply',formData)
                .then(function(response){
                    that.teamdata=response.data;
                })
                .catch(function(error){
                    console.log(error);
                });           
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
