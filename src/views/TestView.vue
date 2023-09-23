
<template>
    <div class="MainPage">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
        <OJHeader />
        <el-button type="primary" @click="example_function">Primary</el-button>
        <el-text>{{ text }}</el-text><br />
        <textarea v-model="markdown"></textarea>
        <div v-html="text2"></div>
        <MarkDownBox :msg="text2"></MarkDownBox>
    </div>
</template>
<style>
.MainPage {
    margin-top: 20px;
    margin-left: 5%;
    margin-right: 5%;
}
</style>

<script>
//e
import axios from 'axios'

import OJHeader from '@/components/OJHeader.vue'
import MarkDownBox from '@/components/Markdown.vue'
import global from '@/components/VueCommon.vue';
import { marked } from "marked";
export default {
    name: 'TestView',

    components: {
        OJHeader,
        MarkDownBox
    },
    methods: {
        example_function: function () {
            var that = this
            axios.post(that.server_url + '/init/init_database')                             //放数据的接口
                .then(function (response) {                         //收到的数据
                    console.log(response);                    //response就是返回数据
                    that.text = response.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    },
    computed: {
        html() {
            return marked(this.text2)
        }
    },
    data() {
        return {
            text: "nothing",
            server_url: global.serverUrl,
            text2: "# 这锅都齐了\n## 怎么还不吃^啊^ \nThis is a ~~tql~~ r^4^ **Markdown** editor. $\\sqrt{3x-1} \\leq (1+x)^2$  $wcnm$^emo^",
            markdown: "# Hello World\n\nThis is a **Markdown** editor.",
            html: ""
        }
    }, watch: {
        markdown(value) {
            this.html = marked(value);
        }
    }
}
</script>
