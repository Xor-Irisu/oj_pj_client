
<template>
    <div class="Passage">
        <div class="PassageHeader">
            <div class="userpic" :style="{ backgroundImage: 'url(' + uHead + ')' }" v-if="!CreateMode">
            </div>
            <el-text class="headerinfo" v-bind:style="{ cursor: cursorType }" @click="toUser(uId)"
                v-on:mouseover="changeStyle" v-on:mouseleave="resetStyle" v-if="!CreateMode">{{ uName }} {{ pTime }}
            </el-text>
            <el-text class="headerinfo_create" v-if="CreateMode">新建文章</el-text>
            <el-button class="EditButton" type="primary" plain
                v-if="((myId == uId) || (myRank == 1) || (myRank == 2)) && (onPassage == 1)" @click="edit">{{ EditLabel
                }}</el-button>
        </div>
        <div class="PassageDiv">
            <el-text class="PassageTitle" v-bind:style="{ cursor: cursorType }" @click="toPassage(pId)"
                v-on:mouseover="changeStyle" v-on:mouseleave="resetStyle" v-if="!EditMode && !CreateMode">{{ pTitle
                }}</el-text>
            <div class="PassageText">
                <MarkdownBox :msg="passage_text" v-if="!EditMode && !CreateMode"></MarkdownBox>
            </div>
            <el-input v-model="pTitle" v-if="EditMode | CreateMode" class="editBox_header"></el-input>
            <el-checkbox v-model="onTop" v-if="(EditMode | CreateMode) && (myRank == 1 || myrank == 2)"
                class="checkbox">置于首页</el-checkbox>
            <el-input v-model="passage_text" v-if="EditMode | CreateMode" type="textarea" class="editBox"
                :autosize="{ minRows: 50, maxRows: 4000 }" :resize="none"></el-input>
        </div>
    </div>
</template>
<style scoped>
.Passage .PassageHeader .EditButton {
    display: block;
    margin-left: 10px;
    margin-top: 23px;
    font-weight: bold;
    float: left;
}

.Passage .PassageDiv .editBox_header {
    margin-top: 20px;
    display: block;
    height: auto;
    width: auto;
    float: left;
}

.PassageDiv .checkbox {
    display: -block;
    float: left;
    margin-top: 29px;
    margin-left: 20px;
    border-color: blue;
}

.Passage .PassageHeader {
    display: inline-block;
    height: 56px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-bottom: 2px solid var(--el-border-color);
}

.Passage .PassageDiv {
    margin-top: 10px;
    display: block;

}

.Passage .PassageTitle {
    font-weight: bold;
    font-size: 30px;
    color: black;
}

.Passage .PassageText {
    padding-left: 10px;
    margin-left: 20px;
    border-left: 5px solid var(--el-border-color);
}

.Passage .PassageHeader .userpic {
    float: left;
    height: 50px;
    width: 50px;
    background-repeat: no-repeat;
    color: var(--el-text-color-primary);
    font-size: 16px;
    border-radius: 40px;
    display: block;
    background-size: 100% 100%;
    margin-right: 0px
}

.Passage .PassageHeader .headerinfo {
    display: block;
    margin-left: 10px;
    margin-top: 30px;
    font-weight: bold;
    font-size: 18px;
    float: left;
}

.Passage .PassageHeader .headerinfo_create {
    display: block;
    margin-left: 10px;
    margin-top: 15px;
    font-weight: bold;
    font-size: 30px;
    float: left;
}

.Passage .PassageDiv .editBox {
    margin-top: 20px;
    display: inline-block;
    height: auto;
}

.Passage {
    display: inline-block;
    color: var(--el-text-color-primary);
    font-size: 16px;
    border: 1px solid var(--el-border-color);
    border-radius: 10px;
    margin-left: 1%;
    width: 58%;
    margin-top: 30px;
    padding: 0px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    background: #FFFFFF;
    padding-bottom: 100px;
}
</style>
<script>
import OJHeader from '@/components/OJHeader.vue'
import MarkdownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
import axios from 'axios'
export default {
    name: 'PassageBox',
    mounted: function () {
        if (this.CreateMode == true) this.EditLabel = "发布"
        else this.getPassage();
    },
    props: {
        pId: Number,
        onPassage: Number,
        CreateMode: Boolean
    },
    components: {
        OJHeader,
        MarkdownBox
    },
    methods: {
        example_function: function () {
        },
        toPassage(value) {
            this.$router.push(`/passage?pId=${value}`)
        },
        getPassage() {
            var that = this
            var url = this.server_url
            var formData = new URLSearchParams();
            formData.append('pId', this.pId)
            axios.post(url + '/passages/passage', formData)                             //放数据的接口
                .then(function (response) {                         //收到的数据
                    console.log(response);                    //response就是返回数据
                    that.passage_text = response.data.Text
                    that.uHead = response.data.uHead
                    that.uName = response.data.uName
                    that.pTime = response.data.pTime
                    that.uId = response.data.uId
                    that.pTitle = response.data.pTitle
                    console.log(`aaa${response.data.pTop}`)
                    if (response.data.pTop == 1)
                        that.onTop = true;
                    else that.onTop = false;
                })
                .catch(function (error) {
                    console.log(error);
                });
            if ('uId' in localStorage) {
                this.myId = localStorage.getItem('uId');
                this.myRank = localStorage.getItem('uRank')
            }
        },
        toUser(value) {
            this.$router.push(`/UserInfo?uId=${value}`)
        },
        changeStyle() {
            this.cursorType = 'pointer'
        },
        resetStyle() {
            this.cursorType = 'auto'
        },
        edit() {
            if (this.CreateMode == false) {
                if (this.EditMode == false) {
                    this.EditMode = true;
                    this.EditLabel = "保存";
                }
                else {
                    this.EditMode = false;
                    this.EditLabel = "编辑";
                    var that = this
                    var url = this.server_url
                    var formData = new URLSearchParams();
                    formData.append('pId', this.pId)
                    formData.append('Text', this.passage_text);
                    formData.append('pTitle', this.pTitle);
                    if (this.onTop == false)
                        formData.append('onTop', 0);
                    else
                        formData.append('onTop', 1);
                    formData.append('EditUserToken', localStorage.getItem('uId_token'));
                    axios.post(url + '/passages/passage_edit', formData)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
            else {
                var url = this.server_url
                var formData = new URLSearchParams();
                formData.append('Text', this.passage_text);
                formData.append('pTitle', this.pTitle)
                if (this.onTop == false)
                    formData.append('onTop', 0);
                else
                    formData.append('onTop', 1);
                var that = this;
                formData.append('EditUserToken', localStorage.getItem('uId_token'));
                if (this.pTitle == "") return;
                axios.post(url + '/passages/passage_create', formData)
                    .then(function (response) {
                        console.log(response);
                        var pId = response.data.pId;
                        console.log(pId);
                        that.$router.push(`/passage?pId=${pId}`)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }

    },
    computed: {

    },
    data() {
        return {
            server_url: global.serverUrl,
            passage_text: "",
            uHead: "",
            uName: "",
            uId: "",
            pTime: "",
            pTitle: "",
            cursorType: 'auto',
            myId: "",
            myRank: 0,
            EditLabel: "编辑",
            EditMode: false,
            onTop: false
        }
    }
    , watch: {
        pId(value) {
            if (this.CreateMode == true) this.EditLabel = "发布"
            else this.getPassage();
        },
        CreateMode(value) {
            if (value == true) this.EditLabel = "发布"
        }
    }
}
</script>
