<template>
    <div class="ContestPage">
        <OJHeader/>
        <div class="ContestList">
            <el-button type="primary" class="createbutton" @click="toCreate">新建比赛</el-button>
            <el-table :data="contestdata" style="width:100%" border stripe>
            <el-table-column width="250px" prop="cName" label="比赛名称"></el-table-column>
            <el-table-column width="250px" prop="cBegintime" :formatter="formatBeginTime" label="开始时间"></el-table-column>
            <el-table-column width="250px" prop="cEndtime" :formatter="formatEndTime" label="结束时间"></el-table-column>
            <el-table-column width="250px" prop="cState" label="比赛状态"></el-table-column>
            <el-table-column width="250px" prop="tType" label="操作">
            <template #default="scope">
                <el-button type="primary" @click="toContest(scope.row.cId)">查看</el-button>
                <el-button v-if="scope.row.tType==='队长'" type="danger" @click="deleteteam(scope.row.tName)">解散团队</el-button>
                <el-button v-if="scope.row.tType==='成员'" type="danger" @click="quitteam(scope.row.tName)">退出团队</el-button>
            </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import OJHeader from '@/components/OJHeader.vue'
    import MarkDownBox from '@/components/Markdown.vue'
    import global from '@/components/VueCommon.vue';
    import axios from 'axios'
    export default {
        name: 'ContestView',
        components:{
            OJHeader
        },
        data(){
            return{
                contestdata:[],
                server_url: global.serverUrl,
            }
        },
        methods:{
            toCreate(){
                this.$router.push({
                    path:'/createcontest'
                })          
            },
            formatBeginTime(row) {
                const datetime = new Date(row.cBeginTime);
                return datetime.toLocaleString();
            },
            formatEndTime(row) {
                const datetime = new Date(row.cEndTime);
                return datetime.toLocaleString();
            },
            toContest(cId) {
                this.$router.push(`/contestmore?cId=${cId}`)
            },
        },
        created(){
            var that=this
            axios.post(that.server_url+'/contest/allcontest')
                .then(function(response){
                    that.contestdata=response.data;
                    console.log(response.data);
                })
                .catch(function(error){
                    console.log(error);
                });           
        }
    }
</script>
<style scoped>
.ContestPage .ContestList .createbutton {
    margin-left: 40px;
    margin-top: 10px;
}
</style>
