
<template>
    <div class="MainPage">
        <OJHeader />
        <el-tabs v-model="activeName" class="tabs">
            <el-tab-pane label="题面" name="first">
                <ProblemBox :ProblemPack=ProblemPack></ProblemBox>
            </el-tab-pane>
            <el-tab-pane label="记录" name="second">记录</el-tab-pane>
            <el-tab-pane label="编辑" name="third">
                <ProblemEdit :ProblemPack=ProblemPack></ProblemEdit>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
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
<script>
import OJHeader from '@/components/OJHeader.vue'
import MarkDownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
import ProblemBox from '@/components/ProblemBox.vue';
import ProblemEdit from '@/components/ProblemEdit.vue';
import axios from 'axios'
export default {
    name: 'ProblemView',
    mounted: function () {
        var query = this.$route.query;
        this.pId = query.pId
        this.get_porblem(this.pId);
    },
    components: {
        OJHeader,
        MarkDownBox,
        ProblemBox,
        ProblemEdit
    },
    methods: {
        example_function: function () {
        },
        get_porblem(pId) {
            var that = this
            var url = this.server_url
            var formData = new URLSearchParams();
            formData.append('pId', pId);//可以这样存放要post的信息
            axios.post(url + '/problem/problem', formData)                             //放数据的接口
                .then(function (response) {                         //收到的数据
                    if (response.data.pName != null)
                        that.pName = response.data.pName;
                    if (response.data.pIntro != null)
                        that.pIntro = response.data.pIntro;
                    if (response.data.pInfo != null)
                        that.pInfo = response.data.pInfo;
                    if (response.data.InFormat != null)
                        that.InFormat = response.data.InFormat;
                    if (response.data.OutFormat != null)
                        that.OutFormat = response.data.OutFormat;
                    if (response.data.Other != null)
                        that.Other = response.data.Other;
                    if (response.data.Exp != null)
                        that.Exp = response.data.Exp;
                    console.log(response);                    //response就是返回数据
                    const pName = that.pName;
                    const pIntro = that.pIntro;
                    const pInfo = that.pInfo;
                    const InFormat = that.InFormat;
                    const OutFormat = that.OutFormat;
                    const Other = that.Other;
                    const Exp = that.Exp;
                    const pId = that.pId;
                    that.ProblemPack = { pName, pIntro, pInfo, InFormat, OutFormat, Other, Exp, pId };
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    computed: {

    },
    data() {
        return {
            server_url: global.serverUrl,
            pId: 0,
            activeName: "first",
            pName: "",
            pIntro: "",
            pInfo: "",
            InFormat: "",
            OutFormat: "",
            Other: "",
            Exp: [],
            ProblemPack: {}
        }
    }
    , watch: {
        '$route.query.pId'() {
            location.reload();
        }
    }
}
</script>
