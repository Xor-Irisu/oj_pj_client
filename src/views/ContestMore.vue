<template>
    <div class="MainPage">
        <OJHeader />
        <el-tabs v-model="activeName" class="tabs">
            <el-tab-pane label="具体信息" name="first">
                <ContestBox :ProblemPack=ProblemPack></ContestBox>
            </el-tab-pane>
            <el-tab-pane label="提交记录" name="second">记录</el-tab-pane>
            <el-tab-pane label="信息编辑" name="third">
                <ContestEdit :ProblemPack=ProblemPack></ContestEdit>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import OJHeader from '@/components/OJHeader.vue'
import MarkDownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
import axios from 'axios'
import ContestBox from "@/components/ContestBox";
import ContestEdit from "@/components/ContestEdit";
export default {
    name: 'ContestMore',
    components: {
        OJHeader,
        MarkDownBox,
        ContestBox,
        ContestEdit
    },
    mounted:function(){
        var query = this.$route.query;
        this.cId = query.cId
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
                    if (response.data[0].cName != null){
                      // console.log(1111111111)
                      that.cName = response.data[0].cName;
                    }

                    if (response.data[0].cBrief != null){
                      // console.log(2222222222)
                      that.cBrief = response.data[0].cBrief;
                    }

                    if (response.data[0].cBeginTime != null){
                      // console.log(33333333333)
                      that.cBeginTime = response.data[0].cBeginTime;
                    }

                    if (response.data[0].cEndTime != null){
                      // console.log(4444444444444)
                      that.cEndTime = response.data[0].cEndTime;
                    }

                    console.log(response);                    //response就是返回数据
                    const cName = that.cName;
                    const cBrief = that.cBrief;
                    const cBeginTime = that.cBeginTime;
                    const cEndTime = that.cEndTime;
                    // console.log(cName)
                    // console.log(cBrief)
                    // console.log(cBeginTime)
                    // console.log(cEndTime)
                    that.ProblemPack = { cName,cBrief,cBeginTime,cEndTime };
                    // console.log(333333333)
                    // console.log(that.ProblemPack)
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