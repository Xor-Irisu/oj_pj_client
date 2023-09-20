<template>
    <div class="ProblemBox">
        <div class="Title">{{ pName }}</div>
        <div class="Title2" v-if="pIntro">题目背景</div>
        <div class="mdBox" v-if="pIntro">
            <MarkDownBox :msg="pIntro"></MarkDownBox>
        </div>
        <div class="Title2" v-if="pInfo">题目简介</div>
        <div class="mdBox" v-if="pInfo">
            <MarkDownBox :msg="pInfo"></MarkDownBox>
        </div>
        <div class="Title2" v-if="InFormat">输入格式</div>
        <div class="mdBox" v-if="InFormat">
            <MarkDownBox :msg="InFormat"></MarkDownBox>
        </div>
        <div class="Title2" v-if="OutFormat">输出格式</div>
        <div class="mdBox" v-if="OutFormat">
            <MarkDownBox :msg="OutFormat"></MarkDownBox>
        </div>
        <div class="Title2" v-if="Exp!=0">样例</div>
        <div class="ExpArea" v-if="Exp!=0">
            <ul>
                <li v-for="exp in Exp" :key="exp.eId" class="ExpBox">
                    <div class="ExpBoxHalf">
                        <div class="ExpTitle">
                            Input #{{ exp.eId }}
                        </div>
                        <div class="PutText">
                            <MarkDownBox :msg="exp.in"></MarkDownBox>
                        </div>
                    </div>
                    <div class="ExpBoxHalf">
                        <div class="ExpTitle">
                            Output #{{ exp.eId }}
                        </div>
                        <div class="PutText">
                            <MarkDownBox :msg="exp.out"></MarkDownBox>
                        </div>
                    </div>
                </li>

            </ul>
        </div>
        <div class="Title2" v-if="Other">其他说明</div>
        <div class="mdBox" v-if="Other">
            <MarkDownBox :msg="Other"></MarkDownBox>
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
        MarkDownBox
    },
    methods: {
        example_function: function () {
        },
        get_porblem(packet) {
            this.pName = packet.pName;
            this.pIntro = packet.pIntro;
            this.pInfo = packet.pInfo;
            this.InFormat = packet.InFormat;
            this.OutFormat = packet.OutFormat;
            this.Other = packet.Other;
            this.Exp = packet.Exp;
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
            pName: "",
            pIntro: "",
            pInfo: "",
            InFormat: "",
            OutFormat: "",
            Other: "",
            Exp: []
        }
    }
    , watch: {
        ProblemPack(value) {
            this.get_porblem(value);
        }
    }
}
</script>
