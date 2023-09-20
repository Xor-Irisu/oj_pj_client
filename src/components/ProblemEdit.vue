<template>
    <div class="ProblemBox">
        <div class="Title2">标题</div>
        <div class="mdBox">
            <el-input v-model="pName"></el-input>
        </div>
        <div class="Title2">题目背景</div>
        <div class="mdBox">
            <el-input v-model="pIntro" type="textarea" :resize="none" :autosize="{ minRows: 4, maxRows: 4000 }"></el-input>
        </div>
        <div class="Title2">题目简介</div>
        <div class="mdBox">
            <el-input v-model="pInfo" type="textarea" :resize="none" :autosize="{ minRows: 4, maxRows: 4000 }"></el-input>
        </div>
        <div class="Title2">输入格式</div>
        <div class="mdBox">
            <el-input v-model="InFormat" type="textarea" :resize="none"
                :autosize="{ minRows: 4, maxRows: 4000 }"></el-input>
        </div>
        <div class="Title2">输出格式</div>
        <div class="mdBox">
            <el-input v-model="OutFormat" type="textarea" :resize="none"
                :autosize="{ minRows: 4, maxRows: 4000 }"></el-input>
        </div>
        <div class="Title2">样例</div>
        <div class="ExpArea">
            <ul>
                <li v-for="exp in Exp" :key="exp.eId" class="ExpBox">
                    <div class="ExpBoxHalf">
                        <div class="ExpTitle">
                            Input #{{ exp.eId }}
                        </div>
                        <div class="PutText">
                            <el-input v-model="exp.in" type="textarea" :resize="none"
                                :autosize="{ minRows: 1, maxRows: 4000 }"></el-input>
                        </div>
                    </div>
                    <div class="ExpBoxHalf">
                        <div class="ExpTitle">
                            Output #{{ exp.eId }}
                        </div>
                        <div class="PutText">
                            <el-input v-model="exp.out" type="textarea" :resize="none"
                                :autosize="{ minRows: 1, maxRows: 4000 }"></el-input>
                        </div>
                    </div>
                </li>

            </ul>
            <el-button type="primary" class="button" @click="addExp"><el-icon>
                    <Plus />
                </el-icon></el-button>
            <el-button type="primary" class="button" @click="delExp"><el-icon>
                    <Minus />
                </el-icon></el-button>
        </div>
        <div class="Title2">其他说明</div>
        <div class="mdBox">
            <el-input v-model="Other" type="textarea" :resize="none" :autosize="{ minRows: 4, maxRows: 4000 }"></el-input>
        </div>
        <el-button type="primary" class="save" @click="save">保存修改</el-button>
    </div>
</template>
<style scoped>
.mdBox {}

.save {
    margin-top: 20px;
}

.button {
    margin-left: 55px;
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
    border-radius: 10px;
    padding: 0px;
    line-height: 3px;
    margin-top: 5px;

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
    name: 'ProblemEdit',
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
            this.pId = packet.pId;
        },
        addExp() {
            let Exp_count = this.Exp.length
            this.Exp.push({ eId: Exp_count + 1, in: "", out: "" })
        },
        delExp() {
            let Exp_count = this.Exp.length
            this.Exp = this.Exp.filter(item => item.eId !== Exp_count)
        },
        save() {
            var that = this
            var url = this.server_url
            var formData = new URLSearchParams();
            formData.append('pId', this.pId)
            formData.append('pName', this.pName)
            formData.append('pIntro', this.pIntro)
            formData.append('pInfo', this.pInfo)
            formData.append('InFormat', this.InFormat)
            formData.append('OutFormat', this.OutFormat)
            formData.append('Other', this.Other)
            let Exp_Input = "";
            let Exp_Output = "";
            let count = this.Exp.length;
            for (let i = 0; i < count; i++) {
                Exp_Input += this.Exp[i].in;
                Exp_Output += this.Exp[i].out;
                if (i != count - 1) Exp_Input += ',', Exp_Output += ','
            }
            formData.append('Exp_Input', Exp_Input);
            formData.append('Exp_Output', Exp_Output);
            console.log(this.Exp)
            axios.post(url + '/problem/edit', formData)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            location.reload();
        }
    },
    computed: {

    },
    props: {
        ProblemPack: Object
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
            pId: 0,
            Exp: [],
        }
    }
    , watch: {
        ProblemPack(value) {
            this.get_porblem(value);
        }
    }
}
</script>
