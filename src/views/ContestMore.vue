<template>
    <div class="MainPage">
        <OJHeader />
        <el-tabs v-model="activeName" class="tabs">
            <el-tab-pane label="具体信息" name="first">
                <ContestBox :ProblemPack=ProblemPack></ContestBox>
            </el-tab-pane>
            <el-tab-pane label="提交记录" name="second">记录</el-tab-pane>
            <el-tab-pane label="信息编辑" name="third">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import OJHeader from '@/components/OJHeader.vue'
import MarkDownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
import axios from 'axios'
export default {
    name: 'ContestMore',
    components: {
        OJHeader,
        MarkDownBox,
    },
    mounted:function(){
        var query = this.$route.query;
        this.pId = query.cId
        this.get_contest(this.cId);
    },
    data(){
        return{
            server_url: global.serverUrl,
            activeName: "first",
            ProblemPack: {},
        }
    },
    methods:{
        get_contest(cId){
            var that = this
            var url = this.server_url
            var formData = new URLSearchParams();
            formData.append('cId', cId);//可以这样存放要post的信息
            axios.post(url + '/contest/getcontest', formData)                             //放数据的接口
                .then(function (response) {                         //收到的数据
                    if (response.data.cName != null)
                        that.cName = response.data.cName;
                    if (response.data.cBrief != null)
                        that.cBrief = response.data.cBrief;
                    if (response.data.cBeginTime != null)
                        that.cBeginTime = response.data.cBeginTime;
                    if (response.data.cEndTime != null)
                        that.cEndTime = response.data.cEndTime;
                    console.log(response);                    //response就是返回数据
                    const cName = that.cName;
                    const cBrief = that.cBrief;
                    const cBeginTime = that.cBeginTime;
                    const cEndTime = that.cEndTime;
                    that.ProblemPack = { cName,cBrief,cBeginTime,cEndTime };
                })
                .catch(function (error) {
                    console.log(error);
            });
        } 
    }
}
</script>
<style scoped>
.tabs {
    padding-left: 20px;
    padding-right: 20px;
    width: auto;
}

.MainPage {
    margin-left: 5%;
    margin-right: 5%;
    background: #F4F5F7;
    height: auto;
    padding-bottom: 100px;
}
</style>