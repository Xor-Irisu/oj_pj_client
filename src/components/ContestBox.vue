<template>
    <div class="ProblemBox">
        <div class="Title">{{ cName }}</div>
        <div class="Title2" v-if="cBrief">比赛说明</div>
        <div class="mdBox" v-if="cBrief">
            <MarkDownBox :msg="cBrief"></MarkDownBox>
        </div>
        <div class="Title2" v-if="cBeginTime">比赛开始时间</div>
        <div class="mdBox" v-if="cBeginTime">
            <MarkDownBox :msg="cBeginTime"></MarkDownBox>
        </div>
        <div class="Title2" v-if="cEndTime">比赛结束时间</div>
        <div class="mdBox" v-if="cEndTime">
            <MarkDownBox :msg="cEndTime"></MarkDownBox>
        </div>
    </div>
</template>
<style scoped>
.mdBox {
    margin-left: 20px;
    padding-left: 10px;
    border-left: 5px solid var(--el-border-color);
}

.ExpBox {
    list-style: none;
}

.ExpTitle {
    font-weight: bold;
}

.ExpBoxHalf {
    display: inline-block;
    vertical-align: top;
    width: 45%;
    margin-top: 10px;
    margin-left: 10px;
}

.PutText {
    border: 1px solid var(--el-border-color);
    border-radius: 10px;
    padding: 0px;
    line-height: 3px;
    padding-left: 10px;
    margin-top: 5px;
    background-color: var(--el-border-color);

}

.Title {
    font-weight: bold;
    font-size: 40px;
    margin-top: 20px;
}

.Title2 {
    margin-left: 10px;
    font-weight: bold;
    font-size: 30px;
    margin-top: 20px;
}

.ProblemBox {
    display: inline-block;
    color: var(--el-text-color-primary);
    font-size: 16px;
    border: 1px solid var(--el-border-color);
    border-radius: 10px;
    margin-left: 0;
    width: 68%;
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    background: #FFFFFF;
    padding-bottom: 100px;
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
import axios from 'axios'

export default {
    name: 'ProblemView',
    mounted: function () {
        this.get_porblem(this.ProblemPack)
    },
    components: {
        OJHeader,
        MarkDownBox,
    },
    methods: {
        example_function: function () {
        },
        get_porblem(packet) {
            this.cName = packet.cName;
            this.cBrief = packet.cBrief;
            this.cBeginTime = packet.cBeginTime;
            this.cEndTime = packet.cEndTime;
        }
    },
    computed: {

    },
    props: {
        ProblemPack:Object
    },
    data() {
        return {
            server_url: global.serverUrl,
            cName: "",
            cBrief: "",
            cBeginTime: "",
            cEndTime: "",
        }
    }
    , watch: {
        ProblemPack(value) {
            this.get_porblem(value);
        }
    }
}
</script>
